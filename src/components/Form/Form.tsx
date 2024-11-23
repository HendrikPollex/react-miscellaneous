import { FormEvent, PropsWithChildren, useId } from "react";
import { FormContextProvider, IFormContext, useFormContext } from "./FormContext";
import * as Yup from 'yup'

interface IBaseFormOpProps<T extends object> {
    initialValues: T;
    onSubmit: (values: T) => void;
    validationSchema?: Yup.ObjectSchema<T>;
    validateOnChange?: boolean;
}

interface IFormOpChildrenProps<T> {
    children: (formProps: IFormContext<T>) => JSX.Element;
}

export interface IFormOpProps<T extends object> extends IBaseFormOpProps<T>, IFormOpChildrenProps<T> {}

export default function FormOp<T extends object>({children, initialValues, onSubmit, validationSchema = undefined, validateOnChange = false}: IFormOpProps<T>): JSX.Element {

    let formId: string = useId();

    return (
        <FormContextProvider
            formId={formId}
            initialValues={initialValues}
            onSubmit={(values: T) => onSubmit(values)}
            validateOnChange={validateOnChange}
            validationSchema={validationSchema}
        >
            <FormOpChildren<T>
                children={children}
            />
        </FormContextProvider>
    );
}

function FormOpChildren<T extends object>({children}: IFormOpChildrenProps<T>): JSX.Element {
    
    const form = useFormContext();

    return children(form);
}

export function Form({children}: PropsWithChildren): JSX.Element {

    const formContext = useFormContext();

    return (
        <form 
            id={formContext.formId}
            className={formContext.validated ? "validated" : ""}
            onSubmit={(e: FormEvent<HTMLFormElement>) => formContext.submitValues(e)}
            onReset={(e: FormEvent<HTMLFormElement>) => formContext.resetValues(e)}
            noValidate
        >
            {children}
        </form>
    );
}