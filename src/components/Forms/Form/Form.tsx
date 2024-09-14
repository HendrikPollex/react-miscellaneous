import { FormEvent, PropsWithChildren } from "react";
import { FormContextProvider, IFormContext, useFormContext } from "./FormContext";

interface IBaseFormOpProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
}

interface IFormOpChildrenProps<T> {
    children: (formProps: IFormContext<T>) => JSX.Element;
}

export interface IFormOpProps<T> extends IBaseFormOpProps<T>, IFormOpChildrenProps<T> {}

export default function FormOp<T extends object>({children, initialValues, onSubmit}: IFormOpProps<T>): JSX.Element {

    return (
        <FormContextProvider
            initialValues={initialValues}
            onSubmit={(values: T) => onSubmit(values)}
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
            className={formContext.validated ? "validated" : ""}
            onSubmit={(e: FormEvent<HTMLFormElement>) => formContext.submitValues(e)}
            onReset={(e: FormEvent<HTMLFormElement>) => formContext.resetValues(e)}
            noValidate
        >
            {children}
        </form>
    );
}