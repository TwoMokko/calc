import {useEffect, useState} from "react";
import {Characters} from "../components/Characters.tsx";
import {Button} from "../components/Button.tsx";
import {SelectCardMultiple} from "../components/SelectCardMultiple.tsx";
import {SelectCard} from "../components/SelectCard.tsx";
import {Connection} from "../components/Connection.tsx";
import {TableCalc} from "../components/Filter/TableCalc.tsx";
import {connection, optionsData, physicalCharacteristics, sendData} from "../types/Types.tsx";
import {fetchData, sendDataForOptions} from "../api/Fetches.tsx";




export function CalcPage(): JSX.Element {
    const [filter, setFilter] = useState<sendData>({})
    const [data, setData] = useState<optionsData | undefined>()

    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {
        if (data){
            // console.log({filter})
            sendDataForOptions(filter)
        }

    }, [filter]);


    function onChangeChar(chars: physicalCharacteristics) {
        setFilter(prev => {
            return {...prev, physicalCharacteristics: chars}
        })
    }


    function onChangeType(types: string[]): void {
        setFilter(prev => {
            return {...prev, type: types}
        })
    }
    function onChangeOption(key: string, value: string): void {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options : []), {key, value}]}
        })
    }

    function onChangeConnection(connection: connection): void {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections : []).filter(itm => itm.connectionNo != connection.connectionNo), connection]}
        })
    }

    function doReset(): void {
        setFilter({})
    }



    if (!data)
        return <div className='loading'>Загрузка</div>


    return <>
        <Characters
            values={filter?.physicalCharacteristics}
            onChange={onChangeChar}
        />
        <section className='option'>
            <h2>Опции</h2>

            <section className='option-type'>
                <SelectCardMultiple
                    title='Тип изделия'
                    values={data.type}
                    onChange={types=> onChangeType(types)}
                />
            </section>

            <section className='option-main'>
                {
                    data.options.map(option => {
                        return <SelectCard
                            key={option.key}
                            value={filter.options?.find(itm => itm.key == option.key)?.value}
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
                            value={filter.connections?.find(itm => itm.connectionNo == connection.connectionNo)}
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

        <section className='table-wrap'>
            <TableCalc filter={filter} />
        </section>
    </>
}