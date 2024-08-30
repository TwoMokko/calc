import {useEffect, useState} from "react";
import {Character} from "../components/Character.tsx";
import {Button} from "../components/Button.tsx";
import {OptionWrap} from "../components/OptionWrap.tsx";



export interface connections {
    connectionNo: number,
    connectionTypes: string[],
    connectionSizes: string[]
}
export interface options {
    key: string,
    value: string[]
}

export type optionsData = {
    type: string[],
    connections: connections[],
    options: options[]
}

// interface physicalCharacteristics {
//     cv?: number,
//     dn?: number,
//     minTemperature?: number,
//     maxTemperature?: number,
//     bodyPressure?: number,
// }

// type sendData = {
//     type: string[],
//     connections: connections[],
//     options: {
//         value: string,
//     }[],
//     physicalCharacteristics?: physicalCharacteristics
// }

async function fetchData(): Promise<optionsData> {
    return await fetch(`http://192.168.0.178:5050/products/options`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

export function CalcPage(): JSX.Element {

    const [data, setData] = useState<optionsData | undefined>()

    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    if (!data)
        return <div className='loading'>Загрузка</div>


    return <>
        <Character/>
        <OptionWrap data={data} />
        <Button title='Очистить всё' className='reset' />
    </>
}