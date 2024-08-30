import {useState} from "react";

export function InputCardMultiple({title, values}: {title: string, values: string[]}): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    // const [inputValues, setInputValues] = useState([])

    function showList(): void {
        setShowMore(!showMore);
    }

    function chooseValue(): void {
        console.log('choose type')
        // setShowMore(!showMore)
    }

    return <div className='input-search'>
        <h4>{title}</h4>
        <div className='input-search-wrap'>
            <input onClick={showList}/>
            {showMore && <div className='input-search-list'>
                {
                    values.map(val => {
                        return <label className='input-search-list-item' key={val}>
                            <input className='hide' type='checkbox' value={val}/>
                            <div
                                className='check'
                                onClick={chooseValue}
                            >{val}</div>
                        </label>
                    })
                }
            </div>}
        </div>
    </div>
}