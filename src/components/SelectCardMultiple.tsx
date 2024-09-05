import {useEffect, useState} from "react";
import {isEqual} from "lodash";

export function SelectCardMultiple({title, value, values, onChange, highlight}: {title: string, value?: string[], values: string[], onChange: (types: string[]) => void, highlight?: string[]}): JSX.Element {
    const [showList, setShowList] = useState(false)
    const [checked, setChecked] = useState<string[]>([])

    useEffect(() => {
        if (!isEqual(value ?? [], caches))
            setChecked(value ?? [])
    }, [value]);

    useEffect(() => {
        sort()
    }, [highlight]);

    function sort(): void {
        // console.log(option, {highlight})
        // console.log('sort')
    }

    function onClick(value: string, status: boolean) {
        const changes = !status
            ?checked.filter(itm => itm != value)
            : [...checked, value]

        setChecked(changes)
        onChange(changes)
    }



    return <div className='input-search'>
        <h4>{title}</h4>
        <div className='input-search-wrap'>
            <input
                // onBlur={() => setTimeout(() => setShowList(false), 100)}
                onClick={() => {setShowList(!showList)}}
            />
            {showList && <div className='input-search-list'>
                {
                    values.map(val => {
                        return <label className='input-search-list-item' key={val}>
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
                                {val}
                            </div>
                        </label>
                    })
                }
            </div>}
        </div>
    </div>
}