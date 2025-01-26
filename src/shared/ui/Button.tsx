import {FC, ReactNode} from "react";

interface ButtonProps {
    title: string,
    className?: string,
    onClick: () => void,
    icon?: ReactNode
}

export const Button: FC<ButtonProps> = ({title, className, onClick, icon}): ReactNode => {
    return <button
        className={'btn ' + className}
        onClick={onClick}
    >
        {
            icon && <span>
                        {icon}
                    </span>
        }
        {title}
    </button>
}