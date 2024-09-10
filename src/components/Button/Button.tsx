import './Button.css';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "tertiary"
    label: string;
}

export default function Button({variant, label, ...htmlButtonProps}: IButtonProps): JSX.Element {

    return (
        <button 
            {...htmlButtonProps}
            className={"react-misc-button " + variant + " " + htmlButtonProps.className}>
            {label}
        </button>
    )
}