import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export function InputCard({value, char, title, className, onInput, icon}: {value?: number, char: string, title: string, className: string, onInput: (char: string, value: string) => void, icon: JSX.Element}): JSX.Element {
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        setCurrentValue(value ? value + '' : '')
    }, [value]);

    const debounceOnInput = useDebouncedCallback(
        // function
        (key: string, value: string) => {
            onInput(key, value)
        },
        // delay in ms
        2000
    );

    return <div className={className}>
        <h4>{title}</h4>
        <div className='input-wrap'>
            {icon}
            <input
                value={currentValue}
                onChange={event => setCurrentValue(event.currentTarget.value)}
                onInput={(event) => {
                    //TODO: debounce
                    debounceOnInput(char, event.currentTarget.value)
                    // onInput(char, event.currentTarget.value)
                }}
            />
        </div>
    </div>
}
