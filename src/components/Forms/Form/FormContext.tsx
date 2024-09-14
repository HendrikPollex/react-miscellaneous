import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IFormProps } from "./Form";

export interface IFormContext<T> {
    values: T;
    setFormValue: (key: string, value: any) => void;
}

const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) throw Error("Form context is only defined inside of form.");
    return context;
}

export function FormContextProvider<T extends object>({children, initialValues}: PropsWithChildren<IFormProps<T>>): JSX.Element {

    const [values, setValues] = useState<T>(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    function setFormValue(key: string, value: any): void {
        setValues({...values, [key]: value } as T);
    }

    return (
        <FormContext.Provider 
            value={{ 
                values: values,
                setFormValue: setFormValue
            }}
        >
            {children}
        </FormContext.Provider>
    )
}