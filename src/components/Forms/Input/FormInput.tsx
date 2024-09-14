import "./FormInput.css";

export interface FormInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "placeholder"> {
    id: string;
    value: T;
    onChange: (value: T) => void;
    label: string;
}

export default function FormInput<T extends string | number | boolean>({id, value, onChange, label, ...inputProps}: FormInputProps<T>): JSX.Element {

    return (
        <div className="react-misc-input-wrapper">
            <label className="react-misc-input-label" >{label}</label>
            <input
                id={id}
                {...inputProps}
                className={"react-misc-input " + (inputProps.className ?? "")}
                value={value as string | number}
                checked={value as boolean}
                onChange={(e) => onChange(e.target.value as T)}
            />
        </div>
    )
}