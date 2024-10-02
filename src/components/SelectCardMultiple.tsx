import {useEffect, useRef, useState} from "react";
import {isEqual} from "lodash";
import {MdElectricBolt, MdKeyboardArrowDown} from "react-icons/md";



export function SelectCardMultiple({title, value, values, onChange, highlight}: {
    title: string,
    value?: string[],
    values: string[],
    onChange: (types: string[]) => void,
    highlight?: string[]
}): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState(false)
    const [checked, setChecked] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>('')
    const [currentValues, setCurrentValues] = useState<string[]>(values)

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
        if (!isEqual(value ?? [], checked))
            setChecked(value ?? [])
    }, [value])

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

    function onClick(value: string, status?: boolean) {
        if (!value) {
            setChecked([])
            onChange([])
            return
        }

        const changes = !status
            ? checked.filter(itm => itm != value)
            : [...checked, value]
        setChecked(changes)
        onChange(changes)
    }

    return <div className={`input-search ${(highlight?.length) ? 'well' : ''}`}>
        <div className='input-search-head'>
            <h4>{title}</h4>
            {
                (checked.length > 0) && <div
                    onClick={() => onClick('')}
                    className='reset-option'
                    title={`сбросить: ${title}`}
                >
                </div>
            }
        </div>
        <div className='input-search-wrap'>
            <div className='input-search-wrap-top'
                 onClick={() => setShowList(true)}
            >
                <MdElectricBolt/>
                <div className='checked-list'>
                    {
                        checked.map(val => {
                            return <div
                                    key={val}
                                    className={`checked-list-item ${highlight?.includes(val) ? '' : (checked.includes(val) ? 'error' : 'disable')}`}
                                    onClick={() => onClick(val, false)}
                            >
                                <div>{val}</div>
                                <div
                                    className='unchecked'
                                ></div>
                            </div>
                        })
                    }
                </div>
                <div className='input-search-wrap-text'>
                    <input
                        ref={inputRef}
                        onChange={event => setInputValue(event.currentTarget.value)}
                        value={inputValue}
                    />
                </div>
                <MdKeyboardArrowDown
                    className={`${showList ? 'show' : ''}`}
                />
            </div>
            {showList && <div className='input-search-list'>
                {
                    currentValues.map(val => {
                        return <label
                                className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (checked.includes(val) ? 'error' : 'disable')}`}
                                key={val}
                                onClick={focusInput}
                        >
                            <input
                                className='hide'
                                type='checkbox'
                                value={val}
                                checked={checked.includes(val)}
                                onChange={
                                    (event) => onClick(val, event.currentTarget.checked)
                                }
                            />
                            <div className='check'>
                                {!inputValue
                                    ? val
                                    : <span
                                        dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>
                                }
                            </div>
                        </label>
                    })
                }
            </div>}
        </div>
    </div>
}