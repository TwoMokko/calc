import {FC, ReactNode} from "react";

interface ButtonProps {
    title: string,
    className?: string,
    onClick: () => void,
    icon?: ReactNode
}

export const Button: FC<ButtonProps> = ({title, className, onClick, icon}): JSX.Element => {
    return <button
        className={'btn ' + className}
        onClick={onClick}
    >
        <span>
            { icon }
        </span>
        {title}
    </button>
}