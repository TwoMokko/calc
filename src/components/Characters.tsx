import {InputCard} from "./InputCard.tsx";
import {useEffect, useState} from "react";
import {physicalCharacteristics} from "../types/Types.tsx";
import {isEqual} from "lodash";

const characteristic: {[key: string]: string} = {
    minTemperature: 'Temp min',
    minPressure: 'Давление min',
    cv: 'Cv',
    bodyPressure: 'ДавлКорп',
    maxTemperature: 'Temp max',
    maxPressure: 'Давление max',
    dn: 'Dn',
}

export function Characters({values, onChange}: {values?: physicalCharacteristics, onChange: Function}): JSX.Element {
    const [chars, setChars] = useState<physicalCharacteristics | undefined>()

    const onInput = (key: string, value: string) => {
        setChars(prev => {
            return {...prev, [key]: parseInt(value)}
        })
    }

    useEffect(() => {
        onChange(chars)
    }, [chars]);


    useEffect(() => {
        if (!isEqual(values, caches))
            setChars(values)
    }, [values]);


    return <>
        <section>
            <h2>Характеристики</h2>
            <div className='character-group block'>
                <div className='character-group-select'>
                    <h4>Наименование</h4>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>

                {
                    Object.keys(characteristic).map(key => {
                        // @ts-ignore
                        return <InputCard value={values && key in values ? values[key] : undefined}
                            key={key}
                            char={key}
                            title={characteristic[key]}
                            className='character-group-select'
                            onInput={onInput}
                        />
                    })
                }
            </div>
        </section>
    </>
}