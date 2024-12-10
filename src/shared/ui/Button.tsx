import { FC } from "react";

interface ButtonProps {
    title: string,
    className?: string,
    onClick: () => void
}

export const Button: FC<ButtonProps> = ({title, className, onClick}): JSX.Element => {
    return <button
        className={'btn ' + className}
        onClick={onClick}
    >
        <span></span>
        {title}
    </button>
}