import {useEffect, useRef, useState} from "react";
import {
    MdKeyboardArrowDown,
} from "react-icons/md";
import {ru} from "../data/Languages.tsx";

export function SelectCard({value, option, values, onChange, highlight, onDelete}: {
    value?: string,
    option: string,
    values: string[],
    onChange: (value: string) => void,
    highlight: string[] | undefined,
    onDelete?: () => void
}): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [currentValues, setCurrentValues] = useState<string[]>(values)

    const [currentValue, setCurrentValue] = useState<string>('')
    const [className, setClassName] = useState<string>()

    useEffect(() => {
        const method = () => {
            if (inputRef.current != document.activeElement)
                setShowList(false)
        }

        document.addEventListener('click', method, false)
        return () => document.removeEventListener('click', method, false)
    }, []);


    const focusInput = () => {
        if (showList && inputRef.current)
            inputRef.current.focus()
    }

    useEffect(focusInput, [showList]);

    useEffect(() => {
        setCurrentValue(value ?? '')
    }, [value])


    function doClick(val: string): void {
        setCurrentValue(val)
        onChange(val)
    }

    function onReset() {
        onDelete && onDelete()
        setCurrentValue('')
    }


    useEffect(() => {
        setCurrentValues(prev => {
            return [
                ...prev.sort((a, b) => {

                    const aIn = highlight?.includes(a)
                    const bIn = highlight?.includes(b)

                    if (inputValue) {
                        let aSearch = a.search(inputValue.toUpperCase()) != -1
                        let bSearch = b.search(inputValue.toUpperCase()) != -1

                        if (aSearch && !bSearch)
                            return -1
                        else if (bSearch && !aSearch)
                            return +1;

                        return 0
                    } else {

                        if (aIn && !bIn)
                            return -1
                        else if (bIn && !aIn)
                            return +1;

                        return 0
                    }
                })
            ]
        })
    }, [highlight, inputValue])

    useEffect(() => {
        currentValue ?
            ( highlight?.length ?
                ( highlight?.includes(currentValue) ? setClassName('well') : setClassName('error') )
                : setClassName('selected-disable') )
            : ( highlight?.length ? setClassName('well') : setClassName('disable') )
    }, [highlight, currentValue]);


    return <div className={`input-search ${className}`}>
        <div className='input-search-head'>
            <h4>{ru[option].title}</h4>
            {
                inputValue && <div
                    // onClick={onReset}
                    onClick={() => {
                        setInputValue('')
                        onReset()
                    }}
                    className='reset-option'
                    title={`сбросить всё для ${ru[option].title}`}
                >
                </div>
            }
        </div>
        <div className='input-search-wrap'>
            <div className='input-search-wrap-top'
                 onClick={() => setShowList(true)}
            >
                {ru[option].icon}

                {currentValue ? <div
                    className='checked-list-item'
                    onMouseDown={onReset}
                    title={`сбросить значение: ${currentValue}`}
                >
                    <div>{currentValue}</div>
                    <div
                        className='unchecked'
                    ></div>
                </div> : ''}


                <div className='input-search-wrap-text'>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={event => {
                            setInputValue(event.currentTarget.value)
                        }}
                    />
                </div>
                <MdKeyboardArrowDown
                    className={`${showList ? 'show' : ''}`}
                />
            </div>
            {showList && <div className='input-search-list'>
                {
                    currentValues.map((val) => {
                        return <div
                            key={val}
                            className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (val == currentValue ? className : 'disable')}`}
                            onMouseDown={() => doClick(val)}
                        >{!inputValue
                            ? val
                            : <span
                                dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>
                        }</div>
                    })
                }
            </div>}
        </div>
    </div>
}