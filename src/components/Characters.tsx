import {InputCard} from "./InputCard.tsx";
import {useEffect, useState} from "react";
import {physicalCharacteristics} from "../routes/CalcPage.tsx";
import {useDebouncedCallback} from "use-debounce";

const characteristic: {[key: string]: string} = {
    minTemperature: 'Temp min',
    minPressure: 'Давление min',
    cv: 'Cv',
    bodyPressure: 'ДавлКорп',
    maxTemperature: 'Temp max',
    maxPressure: 'Давление max',
    dn: 'Dn',
}



export function Characters({onChange}: {onChange: Function}) {
    const [chars, setChars] = useState<physicalCharacteristics>({})

    const onInput = useDebouncedCallback(
        // function
        (key: string, value: string) => {
            setChars(prev => {
                return {...prev, [key]: parseInt(value)}
            })
        },
        // delay in ms
        2000
    );
    // function onInput(key: string, value: string) {
    //
    //     setChars(prev => {
    //         return {...prev, [key]: parseInt(value)}
    //     })
    // }

    useEffect(() => {
        onChange(chars)
    }, [chars]);

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
                    Object.keys(characteristic).map(key =>
                        <InputCard
                            key={key}
                            char={key}
                            title={characteristic[key]}
                            className='character-group-select'
                            onInput={onInput}
                        />
                    )
                }
            </div>
        </section>
    </>
}