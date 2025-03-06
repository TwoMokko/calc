import { FC, ReactNode, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface InputCardProps {
    value?: number,
    char: string,
    title: string,
    className: string,
    onInput: (char: string, value: string) => void,
    icon: ReactNode,
    placeholder?: string
}

const InputCard: FC<InputCardProps> = ({value, char, title, className, onInput, icon, placeholder}): ReactNode => {
    /** Constants */
    const [currentValue, setCurrentValue] = useState<string>('')                // Значение в поле input


    /** Constants (functions) */
    /* Вызов callback функции onInput через указанное кол-во миллисекунд бездействия */
    const debounceOnInput = useDebouncedCallback(
        (key: string, value: string) => {
            onInput(key, value)
        },
        1000
    )


    /** UseEffects */
    /* При изменении данных, приходящих извне устанавливать значение currentValue */
    useEffect(() => {
        setCurrentValue(value ? value + '' : '')
    }, [value])


    /** Build DOM */
    return <div className={className}>
        <h4>{title}</h4>
        <div className='input-wrap'>
            {icon}
            <input
                placeholder={placeholder}
                value={currentValue}
                onChange={event => setCurrentValue(event.currentTarget.value)}
                onInput={(event) => {
                    debounceOnInput(char, event.currentTarget.value)
                }}
            />
        </div>
    </div>
}

export default InputCard
