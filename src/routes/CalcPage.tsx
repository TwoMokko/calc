import {useEffect, useState} from "react";
import {Characters} from "../components/Characters.tsx";
import {SelectCardMultiple} from "../components/SelectCardMultiple.tsx";
import {SelectCard} from "../components/SelectCard.tsx";
import {Connection} from "../components/Connection.tsx";
import {TableCalc} from "../components/Filter/TableCalc.tsx";
import {
    connection,
    optionsData,
    physicalCharacteristics,
    sendData,
} from "../types/Types.tsx";
import {fetchData, sendDataForOptions} from "../api/Fetches.tsx";
import {Top} from "../components/Filter/Top.tsx";

export function CalcPage(): JSX.Element {
    const [filter, setFilter] = useState<sendData>({

        // TODO: GET параметры
        // options
        //     :
        //     [{key: "assembly", value: "A"}],
        // type
        //     :
        //     ["CBFC", "CBFU"]

    })
    const [data, setData] = useState<optionsData | undefined>()
    const [highlight, setHighlight] = useState<optionsData | undefined>()

    const [colorSelect, setColorSelect] = useState(false)

    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {
        (!filter.physicalCharacteristics && !filter.type && !filter.options && !filter.connections?.length && !filter.productType)
            ? setColorSelect(false) : setColorSelect(true)
        if (data) {
            sendDataForOptions(filter, setHighlight)
        }
    }, [filter]);


    function onChangeChar(chars?: physicalCharacteristics) {
        setFilter(prev => {
            return {...prev, physicalCharacteristics: chars}
        })
    }


    function onChangeTypeProd(keys: string[]): void {
        setFilter(prev => {

            if (!keys.length)
                delete prev.productType
            else
                prev.productType = keys

            return {...prev}
        })
    }
    function onChangeType(types: string[]): void {
        setFilter(prev => {

            if (!types.length)
                delete prev.type
            else
                prev.type = types

            return {...prev}
        })
    }
    function onChangeOption(key: string, value: string): void {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : []), {key, value}]}
        })
    }

    function onDeleteOption(key: string) {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : [])]}
        })
    }

    function onDeleteConnection(connection: connection) {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : [])]}
        })
    }

    function onChangeConnection(connection: connection): void {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : []), connection]}
        })
    }

    function doReset(): void {
        setFilter({})
    }



    if (!data)
        return <div className='loading'>
            <div></div>
            <div>Загрузка</div>
        </div>


    return <>
        <Top
            doReset={doReset}
        />

        <Characters
            values={filter?.physicalCharacteristics}
            onChange={onChangeChar}
            highlightTree={highlight?.productType}
            onChangeSelectTree={onChangeTypeProd}
            colorSelect={colorSelect}
        />
        <section className={`option section ${colorSelect ? '' : 'not-color'}`}>
            <h2>Опции</h2>

            <section className='option-type'>
                <SelectCardMultiple
                    title='Тип изделия'
                    value={filter.type}
                    values={data.type}
                    onChange={types => onChangeType(types)}
                    highlight={highlight?.type}
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
                            onDelete={() => onDeleteOption(option.key)}
                            highlight={highlight?.options?.find(itm => itm.key == option.key)?.value}
                        />
                    })
                }
            </section>
        </section>

        <section className={`option-connections section ${colorSelect ? '' : 'not-color'}`}>
            <h2>Подсоединения</h2>
            <div className="block">
                {
                    data.connections.map(connection => {
                        return <Connection
                            value={filter.connections?.find(itm => itm.connectionNo == connection.connectionNo)}
                            key={connection.connectionNo}
                            connection={connection}
                            onChange={value => onChangeConnection(value)}
                            onDelete={() => onDeleteConnection(connection)}
                            highlight={highlight?.connections?.find(itm => itm.connectionNo == connection.connectionNo)}
                        />
                    })
                }
            </div>
        </section>

        <section className='table-wrap section'>
            <TableCalc filter={filter}/>
        </section>
    </>
}