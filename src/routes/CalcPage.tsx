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
} from "../types/Types.tsx";
import {fetchData, sendDataForOptions} from "../api/Fetches.tsx";
import {Top} from "../components/Filter/Top.tsx";
import useSearchFilterParams from "../hooks/useSearchFilterParams.tsx";

export function CalcPage(): JSX.Element {
    const [filter, setFilter] = useSearchFilterParams()
    const [data, setData] = useState<optionsData | undefined>()
    const [highlight, setHighlight] = useState<optionsData | undefined>()

    const [colorSelect, setColorSelect] = useState(false)

    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {
        setColorSelect(!(!filter.physicalCharacteristics && !filter.type && !filter.options && !filter.connections?.length && !filter.productType))
        if (data)
            sendDataForOptions(filter, setHighlight)
    }, [filter]);


    function onChangeChar(chars?: physicalCharacteristics) {
        setFilter(prev => {
            return {...prev, physicalCharacteristics: chars}
        }, 'onChangeChar')
    }


    function onChangeTypeProd(keys: string[]): void {
        setFilter(prev => {

            if (!keys.length)
                delete prev.productType
            else
                prev.productType = keys

            return {...prev}
        }, 'onChangeTypeProd')
    }
    function onChangeType(types: string[]): void {
        setFilter(prev => {

            if (!types.length)
                delete prev.type
            else
                prev.type = types

            return {...prev}
        }, 'onChangeType')
    }
    function onChangeOption(key: string, value: string): void {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : []), {key, value}]}
        }, 'onChangeOption')
    }

    function onDeleteOption(key: string) {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : [])]}
        }, 'onDeleteOption')
    }

    function onDeleteConnection(connection: connection) {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : [])]}
        }, 'onDeleteConnection')
    }

    function onChangeConnection(connection: connection): void {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : []), connection]}
        }, 'onChangeConnection')
    }

    function doReset(): void {
        setFilter({}, 'doReset')
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
            valuesTree={filter?.productType}
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

            {/*<section className='not-options'>Выберите тип продукции или тип изделия</section>*/}
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
            <TableCalc filter={filter} />
        </section>
    </>
}