import { SvgIcon } from '@mui/material';
import './Button.css';
import { SvgIconComponent } from '@mui/icons-material';

interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant"> {
    variant: "primary" | "secondary" | "tertiary"
    label?: string;
    imageLeft?: SvgIconComponent;
    imageRight?: SvgIconComponent; 
}

export default function Button({variant, label, imageLeft, imageRight, ...htmlButtonProps}: IButtonProps): JSX.Element {

    return (
        <button
            {...htmlButtonProps}
            className={"react-misc-button " + variant + " " + (htmlButtonProps.className ?? "")}
        >
            { imageLeft && <SvgIcon className="image-left" component={imageLeft} />}
            { label && <span className="react-misc-button-label">{label}</span> }
            { imageRight && <SvgIcon className="image-right" component={imageRight} />}
        </button>
    )
}