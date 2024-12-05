import React from 'react';
import './Button.css';

export interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant"> {
    variant: "primary" | "secondary" | "tertiary"
}

export function Button({variant, children, ...htmlButtonProps}: IButtonProps): JSX.Element {

    return (
        <button
            {...htmlButtonProps}
            className={"react-misc-button " + variant + " " + (htmlButtonProps.className ?? "")}
        >
            {children}
        </button>
    )
}