import {ReactNode, useEffect, useState} from "react";
import { Characters } from "./Characters.tsx";
import { SelectCardMultiple } from "../../../shared/ui/SelectCardMultiple.tsx";
import { SelectCard } from "../../../shared/ui/SelectCard.tsx";
import { Connection } from "./Connection.tsx";
import { TableCalc } from "./TableCalc.tsx";
import {connection, FilterOptionType, optionsData, physicalCharacteristics} from "../../../shared/api/models.ts";
import { Top } from "./Top.tsx";
import { useSearchFilterParams } from "../../../shared/hooks/useSearchFilterParams.ts";
import { fetchData, sendDataForOptions } from "../api/fetches.ts";
import { SelectCardMultipleTree } from "../../../shared/ui/SelectCardMultipleTree.tsx";
import { Configuration } from "./Configuration.tsx";

export const CalcPage = (): ReactNode => {
    /** Constants */
    const [filter, setFilter] = useSearchFilterParams()                             // Данные, которые отправляются на сервер (выбранные опции и прочее)
    const [data, setData] = useState<optionsData | undefined>()                     // Данные для каждой опции, которые приходят от сервера один раз в самом начале (select list: все опции)
    const [highlight, setHighlight] = useState<optionsData | undefined>()           // Данные для каждой опции, которые приходят от сервера каждый раз (select list: опции, которые можно выбрать)

    const [colorSelect, setColorSelect] = useState(false)                 // Стейт для того, чтобы не красились поля, когда calculator пустой


    /** UseEffects */
    /* Запрос при инициализации компонента,
    получение и установка данных для отрисовки страницы */
    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {
        // TODO: переписать
        // После измениня фильтра проверка: если фильтр пустой, то не подкрашивать все опции
        setColorSelect(!((!filter.physicalCharacteristics || !Object.keys(filter.physicalCharacteristics).length) && (!filter.type || !filter.type.length) && (!filter.options || !filter.options.length) && !filter.connections?.length && (!filter.productType || !filter.productType.length)))

        // После измениня фильтра отправка запроса (с новым фильтром и функцией, которая устанавливает новые данные, которые можно выбрать )
        if (data)
            sendDataForOptions(filter, setHighlight)
    }, [filter]);


    /** Constants (functions) */
    /* Изменение конкретной характеристики в объекте calculator.physicalCharacteristics */
    const onChangeChar = (chars?: physicalCharacteristics): void => {
        setFilter(prev => {
            return {...prev, physicalCharacteristics: chars}
        }, 'onChangeChar')
    }

    /* Изменение массива с ключами productType в calculator */
    const onChangeTypeProd = (keys: string[]): void => {
        setFilter(prev => {

            // Если новый массив пустой, то удалить ключ и значение productType в calculator, иначе перезаписать массив
            if (!keys.length)
                delete prev.productType
            else
                prev.productType = keys

            return {...prev}
        }, 'onChangeTypeProd')
    }

    /* Изменение массива type в calculator */
    const onChangeType = (types: string[]): void => {
        setFilter(prev => {

            // Если новый массив пустой, то удалить ключ и значение  type в calculator, иначе перезаписать массив
            if (!types.length)
                delete prev.type
            else
                prev.type = types

            return {...prev}
        }, 'onChangeType')
    }

    /* Изменение конкретной опции в массиве calculator.options, если нету ни одной, то присвоить пустой массив */
    const onChangeOption = (key: string, value: string): void => {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : []), {key, value}]}
        }, 'onChangeOption')
    }

    /* Изменение значения конфигурации, если нету, удалить */
    const onChangeConfiguration = (value?: string): void => {
        // const item = data?.configuration.find(itm => itm.value === value)

        const testData = [{key: 'a', value: '1'}, {key: 'b', value: '2'}, {key: 'c', value: '3'}]
        const item = data?.configuration ? data?.configuration.find(itm => itm.value === value) : testData.find(itm => itm.value === value)

        console.log({item})

        setFilter(prev => {
            if (!item)
                delete prev.configuration
            else
                prev.configuration = item.key

            return {...prev}
        }, 'onChangeConfiguration')
    }

    /* Изменение connection с конкретным connectionNo в calculator.connections, если нету ни одной, то присвоить пустой массив */
    const onChangeConnection = (connection: connection): void => {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : []), connection]}
        }, 'onChangeConnection')
    }

    /* Фильтровка calculator.options без элемента, чей ключ равен приходящему параметру */
    const onDeleteOption = (key: string): void => {
        setFilter(prev => {
            return {...prev, options: [...(prev.options ? prev.options.filter(itm => itm.key != key) : [])]}
        }, 'onDeleteOption')
    }

    /* Фильтровка calculator.connections без connection, чей connectionNo равен connectionNo приходящего параметра */
    const onDeleteConnection = (connection: connection): void => {
        setFilter(prev => {
            return {...prev, connections: [...(prev.connections ? prev.connections.filter(itm => itm.connectionNo != connection.connectionNo) : [])]}
        }, 'onDeleteConnection')
    }

    /* Удаление по ключу определенного элемента из объекта calculator.physicalCharacteristics */
    const onDeleteCharacteristic = (key: keyof physicalCharacteristics): void => {
        setFilter(prev => {
            const result = {...prev}
            if (result.physicalCharacteristics)
                delete result.physicalCharacteristics[key]
            return {...result, physicalCharacteristics: {...result.physicalCharacteristics}}
        })
    }

    /* Обнуление calculator */
    const doReset = (): void => {
        setFilter({}, 'doReset')
    }


    /* Вызов нужней функции в зависимости от приходящего параметра funcName
    Чтобы не передавать все функции в качестве props в дочерний компонент
    (в строке с выбранными значениями опций, характеристик и подсоединений) */
    const onDeleteAtChoiceString = (funcName: string, key: string | connection | keyof physicalCharacteristics): void =>  {
        switch (funcName) {
            case 'onDeleteOption':
                onDeleteOption(key as string)
                break
            case 'onDeleteConnection':
                // @ts-ignore
                if (key.connectionType || key.connectionSize)           // Если есть тип или размер, то вызвать функцию, где перезаписывается объект connection
                    onChangeConnection(key as connection)
                else onDeleteConnection(key as connection)              // Если  нет ни типа, ни размера, вызывать функцию, где удаляется объект connection мз массива calculator.connections
                break
            case 'onDeleteCharacteristic':
                onDeleteCharacteristic(key as keyof physicalCharacteristics)
        }
    }


    /** Build DOM */
    /* Проверка, пришли ли данные для отрисовки DOM  */
    if (!data)
        return <div className='loading'>
            <div></div>
            <div>Загрузка</div>
        </div>


    /* Отрисовка DOM */
    return <>
        <Top
            doReset={doReset}
            filter={filter}
            onDeleteAtChoiceString={onDeleteAtChoiceString}
        />

        <section className={`section ${colorSelect ? '' : 'not-color'}`}>
            <h2>Характеристики</h2>
            <SelectCardMultipleTree
                title={FilterOptionType.TYPE_PRODUCT}
                onChange={onChangeTypeProd}
                highlight={highlight?.productType}
                valuesFilter={filter?.productType}
            />
            <div className='character-group block'>
                <Characters
                    values={filter?.physicalCharacteristics}
                    onChange={onChangeChar}
                />
                <Configuration
                    option={'configuration'}
                    data={data.configuration ?? [{key: 'a', value: '1'}, {key: 'b', value: '2'}, {key: 'c', value: '3'}]}
                    onChange={onChangeConfiguration}
                    onDelete={onChangeConfiguration}
                    highlight={['1', '3']}
                />
            </div>
        </section>


        <section className={`option section ${colorSelect ? '' : 'not-color'}`}>
            <h2>Опции</h2>

            <section className='option-type'>
                <SelectCardMultiple
                    title={FilterOptionType.TYPE}
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

        <section className='section'>
            <TableCalc filter={filter}/>
        </section>
    </>
}