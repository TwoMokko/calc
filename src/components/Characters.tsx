import {InputCard} from "./InputCard.tsx";
import {useEffect, useState} from "react";
import {physicalCharacteristics} from "../types/Types.tsx";
import {isEqual} from "lodash";
import {
    MdExplore,
    MdOutlineCenterFocusWeak, MdOutlineFullscreen, MdOutlineFullscreenExit,
    MdOutlineThermostat,
    MdSensorWindow,
} from "react-icons/md";

const characteristic: {[key: string]: [string, JSX.Element]} = {
    minTemperature: ['Temp min', <MdOutlineThermostat />],
    minPressure: ['Давление min', <MdOutlineFullscreenExit />],
    cv: ['Cv', <MdSensorWindow />],
    bodyPressure: ['ДавлКорп', <MdExplore />],
    maxTemperature: ['Temp max', <MdOutlineThermostat />],
    maxPressure: ['Давление max', <MdOutlineFullscreen />],
    dn: ['Dn', <MdOutlineCenterFocusWeak />],
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
        if (!isEqual(values, chars))
            setChars(values)
    }, [values]);


    return <>
        <section className='section'>
            <h2>Характеристики</h2>
            <div className='character-group block'>
                <div className='character-group-select'>
                    <h4>Наименование</h4>
                    <div className="input-wrap">
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>

                {
                    Object.keys(characteristic).map(key => {
                        // @ts-ignore
                        return <InputCard value={values && key in values ? values[key] : undefined}
                            key={key}
                            char={key}
                            title={characteristic[key][0]}
                            className='character-group-select'
                            onInput={onInput}
                            icon={characteristic[key][1]}
                        />
                    })
                }
            </div>
        </section>
    </>
}