import { FormContextProvider, IFormContext, useFormContext } from "./FormContext";

export interface IFormProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
}

interface IFormChildren<T> {
    children: (formProps: IFormContext<T>) => JSX.Element | JSX.Element[];
}

type IFormPropsWithChildren<T> = IFormProps<T> & IFormChildren<T>;

export default function Form<T extends object>({children, initialValues, onSubmit}: IFormPropsWithChildren<T>): JSX.Element {

    return (
        <FormContextProvider
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <FormDetails
                children={children}
            />
        </FormContextProvider>
    );
}

function FormDetails<T extends object>({children}: IFormChildren<T>): JSX.Element {

    const formContext = useFormContext();

    return (
        <>
            {children(formContext)}
        </>
    );
}