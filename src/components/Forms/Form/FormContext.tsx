import { createContext, FormEvent, PropsWithChildren, useContext, useEffect, useState } from "react";

export interface IFormContext<T> {
    values: T;
    validated: boolean;
    setFormValue: (key: string, value: any) => void;
    submitValues: (e: FormEvent<HTMLFormElement>) => void;
    resetValues: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IFormContextProviderProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
}

const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) throw Error("Form context is only defined inside of form.");
    return context;
}

export function FormContextProvider<T extends object>({children, initialValues, onSubmit}: PropsWithChildren<IFormContextProviderProps<T>>): JSX.Element {

    const [values, setValues] = useState<T>(initialValues);
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    function setFormValue(key: string, value: any): void {
        setValues({...values, [key]: value } as T);
    }

    function focusFirstInvalidInput(form: HTMLFormElement): void {
        let input: HTMLInputElement | null = form.querySelector("input.react-misc-input:invalid");
        input?.focus();
    }

    function submitValues(e: FormEvent<HTMLFormElement>): void {
        const form: HTMLFormElement = e.currentTarget;
        
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity()) {
            onSubmit(values);
            setValidated(false);
            resetValues(e);
        } else {
            focusFirstInvalidInput(form);
        }
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
                submitValues: submitValues
            }}
        >
            {children}
        </FormContext.Provider>
    )
}