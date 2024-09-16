import { createContext, FormEvent, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Yup from 'yup';

type FormErrors<T> = {
    [K in keyof T]: string | null;
}

export interface IFormContext<T> {
    values: T;
    validated: boolean;
    setFormValue: (key: string, value: any) => void;
    submitValues: (e: FormEvent<HTMLFormElement>) => void;
    resetValues: (e: FormEvent<HTMLFormElement>) => void;
    errors: FormErrors<T> | undefined;
    formId: string;
}

export interface IFormContextProviderProps<T extends object> {
    initialValues: T;
    onSubmit: (values: T) => void;
    validateOnChange?: boolean;
    validationSchema?: Yup.ObjectSchema<T>;
    formId: string;
}

const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) throw Error("Form context is only defined inside of form.");
    return context;
}

export function FormContextProvider<T extends object>({children, initialValues, onSubmit, validateOnChange = false, validationSchema = undefined, formId}: PropsWithChildren<IFormContextProviderProps<T>>): JSX.Element {

    const [values, setValues] = useState<T>(initialValues);
    const [validated, setValidated] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors<T>>();

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    useEffect(() => {
        if (validateOnChange && validated) {
            validateValues().then((errors: FormErrors<T>) => {
                setInputErrors(document.querySelector<HTMLFormElement>(`form[id="${formId}"`)!, errors);
            });
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values, validateOnChange, validated, formId]);

    function setFormValue(key: string, value: any): void {
        setValues({...values, [key]: value } as T);
    }

    function focusFirstInvalidInput(form: HTMLFormElement): void {
        let input: HTMLInputElement | null = form.querySelector("input.react-misc-input:invalid");
        input?.focus();
    }

    async function submitValues(e: FormEvent<HTMLFormElement>): Promise<void> {
        const form: HTMLFormElement = e.currentTarget;
        
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        validateValues().then((errors: FormErrors<T>) => {
            setInputErrors(form, errors);
        });

        validationSchema?.isValid(values)
            .then((isValid: boolean) => {
                if (isValid) {
                    onSubmit(values);
                    setValidated(false);
                    resetValues(e);
                } else {
                    focusFirstInvalidInput(form);
                }
            });
    }

    async function validateValues(): Promise<FormErrors<T>> {
        let formErrors: Yup.ValidationError[] = await getErrors();
        return JSON.parse('{' + Object.keys(values).map(k => {
            let formError: string | undefined = formErrors.find(e => e.path === k)?.message;
            return '"' + k + '": ' + (formError !== undefined ? '"' + formError + '"' : 'null');
        }).join(",") + "}") as FormErrors<T>;
    }

    async function getErrors(): Promise<Yup.ValidationError[]> {
        let formErrors: Yup.ValidationError[] = [];
        Object.keys(values).forEach((k: string) => {
            validationSchema?.validateAt(k, values)
                .catch((error: Yup.ValidationError) => {
                    formErrors.push(error);
                })
        })
        return formErrors;
    }

    function setInputErrors(form: HTMLFormElement, errors: FormErrors<T>): void {
        Object.entries(errors).forEach((e: [string, any]) => {
            const name: string = e[0];
            const error: string = e[1] != null ? e[1] : "";
            form.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.setCustomValidity(error);
        })
        setErrors(errors);
    }

    function resetValues(e: FormEvent<HTMLFormElement>): void {
        setValues(initialValues);
        
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <FormContext.Provider 
            value={{ 
                values: values,
                validated: validated,
                setFormValue: setFormValue,
                resetValues: resetValues,
                submitValues: submitValues,
                errors: errors,
                formId: formId
            }}
        >
            {children}
        </FormContext.Provider>
    )
}