import { useFormContext } from "../Form/FormContext";
import "./FormInput.css";

export interface FormInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "placeholder" | "required" | "type" | "name"> {
    field: string;
    type: "text" | "number";
    value: T;
    onChange: (value: T) => void;
    label: string;
    required?: boolean;
}

export default function FormInput<T extends string | number>({field, value, onChange, label, required = false, ...inputProps}: FormInputProps<T>): JSX.Element {

    const formContext = useFormContext();

    return (
        <div className="react-misc-form-input-wrapper">
            <div className={"react-misc-input-wrapper " + (inputProps.className ?? "")}>
                {formContext !== undefined && formContext.errors !== undefined && Object.entries(formContext.errors).find(e => e[0] === field)![1] != null ?
                    <label 
                        className="react-misc-input-label react-misc-input-error-message"
                    >
                        {label + " "}
                        {Object.entries(formContext.errors).find(e => e[0] === field)![1]}
                    </label>
                :
                    <label
                        className="react-misc-input-label"
                    >
                        {label + " "}
                        {required && <span className="required-indicator">{"*"}</span>}
                    </label>
                }
                <input
                    {...inputProps}
                    id={field}
                    name={field}
                    className={"react-misc-input"}
                    value={value as string | number}
                    onChange={(e) => onChange(e.target.value as T)}
                    required={required}
                    aria-required={required}
                    
                />
            </div>
        </div>
    )
}