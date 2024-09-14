import "./FormInput.css";

export interface FormInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "placeholder" | "required" | "type" | "name"> {
    id: string;
    field: string;
    type: "text" | "number";
    value: T;
    onChange: (value: T) => void;
    label: string;
    required?: boolean;
}

export default function FormInput<T extends string | number>({id, field, value, onChange, label, required = false, ...inputProps}: FormInputProps<T>): JSX.Element {

    return (
        <div className={"react-misc-input-wrapper " + (inputProps.className ?? "")}>
            <label className="react-misc-input-label" >{label}{required && <span className="required-indicator">{" *"}</span>}</label>
            <input
                {...inputProps}
                id={id}
                name={field}
                className={"react-misc-input"}
                value={value as string | number}
                onChange={(e) => onChange(e.target.value as T)}
                required={required}
                aria-required={required}
            />
        </div>
    )
}