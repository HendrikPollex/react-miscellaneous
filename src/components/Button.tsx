
interface ButtonProps {
    variant: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger"
};

export default function Button({variant}: ButtonProps): JSX.Element {

    return (
        <button
            className={"react-misc " + variant}
        >

        </button>
    );
};