import './Button.css';

interface IButtonProps {
    variant: "primary" | "secondary" | "danger" | "warning" | "success"
    label: string;
}

export default function Button({variant, label}: IButtonProps): JSX.Element {

    return (
        <button className={variant}>
            {label}
        </button>
    )
}