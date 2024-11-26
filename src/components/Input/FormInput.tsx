import React, { RefObject, useRef } from "react";
import "./FormInput.css";
import { ErrorMessage } from "formik";

export interface FormInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "placeholder" | "required" | "type" | "name"> {
    field: string;
    type: "text" | "number";
    value: T;
    onChange: (value: T) => void;
    label: string;
    required?: boolean;
}

export default function FormInput<T extends string | number>({field, value, onChange, label, required = false, ...inputProps}: FormInputProps<T>): JSX.Element {

    const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    return (
        <div className="react-misc-form-input-wrapper" onClick={() => inputRef.current?.focus()}>
            <div className={"react-misc-input-wrapper " + (inputProps.className ?? "")}>
                <label 
                    className={"react-misc-input-label"}
                >
                    {label + " "}
                    {required && <span className="required-indicator">{"*"}</span>}
                </label>
                <input
                    {...inputProps}
                    id={field}
                    name={field}
                    className={"react-misc-input"}
                    value={value as string | number}
                    onChange={(e) => onChange(e.target.value as T)}
                    required={required}
                    aria-required={required}
                    ref={inputRef}
                />
            </div>
            <ErrorMessage 
                name={field}
                render={(message: string) => 
                    <span className="react-misc-input-error-message">
                        <img src="/images/exclamation.svg" alt="" />
                        <span>{message}</span>
                    </span>
                }
            />
        </div>
    )
}