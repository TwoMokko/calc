import {useEffect, useState} from "react";
import {Character} from "../components/Character.tsx";
import {Button} from "../components/Button.tsx";
import {InputCardMultiple} from "../components/InputCardMultiple.tsx";
import {InputCard} from "../components/InputCard.tsx";
import {Connection} from "../components/Connection.tsx";



export interface connections {
    connectionNo: number,
    connectionTypes: string[],
    connectionSizes: string[]
}

export interface connection {
    connectionNo: number,
    connectionTypes?: string,
    connectionSizes?: string
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

interface physicalCharacteristics {
    cv?: number,
    dn?: number,
    minTemperature?: number,
    maxTemperature?: number,
    bodyPressure?: number,
}

type sendData = {
    type?: string[],
    connections?: connection[],
    options?: {
        key: string,
        value: string,
    }[],
    physicalCharacteristics?: physicalCharacteristics
}

async function fetchData(): Promise<optionsData> {
    return await fetch(`http://192.168.0.178:5050/products/options`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

// function sendDataForOptions(): Promise<optionsData> {
//     fetch(`http://192.168.0.178:5050/products/options`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(filter)
//     })
//         .then(async response => {
//             const result = await response.json()
//             console.log('options: ', {result})
//         });
// }
//
// function sendDataForProduct(): Promise<productData> {
//
//     // TODO: currentPage and sizePage
//     const currentPage = 1;
//     const sizePage = 20;
//     fetch(`http://192.168.0.178:5050/products/sold?PageId=${currentPage}&PageSize=${sizePage}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(filter)
//     })
//         .then(async response => {
//             let result = await response.json()
//             console.log('table', result)
//         })
// }



export function CalcPage(): JSX.Element {
    const [filter, setFilter] = useState<sendData>({})
    const [data, setData] = useState<optionsData | undefined>()

    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {
        console.log({filter})

        sendDataForOptions()
        sendDataForProduct()
    }, [filter]);

    function onChangeType(types: string[]) {
        setFilter(prev => {
            return {...prev, type: types}
        })
    }
    function onChangeOption(key: string, value: string) {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options : []), {key, value}]}
        })
    }

    function onChangeConnection(connection: connection) {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections : []).filter(itm => itm.connectionNo != connection.connectionNo), connection]}
        })
    }

    function doReset() {
        // setFilter([])
    }


    // TODO: вынести запросы в другой файл
    function sendDataForOptions() {
        fetch(`http://192.168.0.178:5050/products/options`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(filter)
        })
            .then(async response => {
                const result = await response.json()
                console.log('options: ', {result})
            });
    }

    function sendDataForProduct() {

        // TODO: currentPage and sizePage
        const currentPage = 1;
        const sizePage = 20;
        fetch(`http://192.168.0.178:5050/products/sold?PageId=${currentPage}&PageSize=${sizePage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(filter)
        })
            .then(async response => {
                let result = await response.json()
                console.log('table', result)
            })
    }

    if (!data)
        return <div className='loading'>Загрузка</div>


    return <>
        <Character/>
        <section className='option'>
            <h2>Опции</h2>

            <section className='option-type'>
                <InputCardMultiple
                    title='Тип изделия'
                    values={data.type}
                    onChange={types=> onChangeType(types)}
                />
            </section>

            <section className='option-main'>
                {
                    data.options.map(option => {
                        return <InputCard
                            key={option.key}
                            option={option.key}
                            values={option.value}
                            onChange={(value) => onChangeOption(option.key, value)}
                        />
                    })
                }
            </section>

            <section className='option-connections block'>
                {
                    data.connections.map(connection => {
                        return <Connection
                            key={connection.connectionNo}
                            connection={connection}
                            onChange={value => onChangeConnection(value)}
                            // highlight={}
                        />
                    })
                }
            </section>
        </section>
        <Button
            title='Очистить всё'
            className='reset'
            onClick={doReset}
        />
    </>
}