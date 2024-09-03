import {useState} from "react";

export function SelectCardMultiple({title, values, onChange}: {title: string, values: string[], onChange: (types: string[]) => void}): JSX.Element {
    const [showList, setShowList] = useState(false)
    const [checked, setChecked] = useState<string[]>([])


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