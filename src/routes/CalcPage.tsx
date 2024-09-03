import {useEffect, useState} from "react";
import {Characters} from "../components/Characters.tsx";
import {Button} from "../components/Button.tsx";
import {SelectCardMultiple} from "../components/SelectCardMultiple.tsx";
import {SelectCard} from "../components/SelectCard.tsx";
import {Connection} from "../components/Connection.tsx";
import {Table} from "../components/table.tsx";
import {Pagination} from "../components/pagination.tsx";

const testProd: productsTable = {
    soldProducts: [
        {
            "vendorCode": "HB2-H-10M",
            "price": 111.19,
            "rating": 4007,
            "typeRating": 70.5,
            "purchasedQuantity": 2554,
            "numberOfOrders": 34,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 890
        },
        {
            "vendorCode": "HB1-H-6M",
            "price": 101.33,
            "rating": 3496,
            "typeRating": 70.5,
            "purchasedQuantity": 2505,
            "numberOfOrders": 34,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 472
        },
        {
            "vendorCode": "HB3-H-12M",
            "price": 229.72,
            "rating": 2790,
            "typeRating": 70.5,
            "purchasedQuantity": 1116,
            "numberOfOrders": 31,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 659
        },
        {
            "vendorCode": "HB2-B3-H-10M",
            "price": 177.73,
            "rating": 2179,
            "typeRating": 70.5,
            "purchasedQuantity": 932,
            "numberOfOrders": 31,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 445
        },
        {
            "vendorCode": "HB1-H-4T",
            "price": 101.33,
            "rating": 1348,
            "typeRating": 70.5,
            "purchasedQuantity": 596,
            "numberOfOrders": 44,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 131
        },
        {
            "vendorCode": "HB1-F-2N",
            "price": 120.93,
            "rating": 1304,
            "typeRating": 70.5,
            "purchasedQuantity": 495,
            "numberOfOrders": 34,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 203
        },
        {
            "vendorCode": "HB2-F-4N",
            "price": 95.51,
            "rating": 1167,
            "typeRating": 70.5,
            "purchasedQuantity": 539,
            "numberOfOrders": 28,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 192
        },
        {
            "vendorCode": "HB1-B3-H-6M",
            "price": 147.12,
            "rating": 1165,
            "typeRating": 70.5,
            "purchasedQuantity": 624,
            "numberOfOrders": 21,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 11
        },
        {
            "vendorCode": "HB2-H-6M",
            "price": 109.55,
            "rating": 1059,
            "typeRating": 70.5,
            "purchasedQuantity": 447,
            "numberOfOrders": 24,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 166
        },
        {
            "vendorCode": "HB3-B3-H-12M",
            "price": 276.4,
            "rating": 963,
            "typeRating": 70.5,
            "purchasedQuantity": 127,
            "numberOfOrders": 17,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 16
        },
        {
            "vendorCode": "HB1-H-6M-PK",
            "price": 121.57,
            "rating": 855,
            "typeRating": 70.5,
            "purchasedQuantity": 310,
            "numberOfOrders": 20,
            "maxTemperature": 232,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 107
        },
        {
            "vendorCode": "HB2-D-10L",
            "price": 111.19,
            "rating": 829,
            "typeRating": 70.5,
            "purchasedQuantity": 347,
            "numberOfOrders": 14,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 142
        },
        {
            "vendorCode": "HB3-H-16M",
            "price": 252.57,
            "rating": 817,
            "typeRating": 70.5,
            "purchasedQuantity": 94,
            "numberOfOrders": 14,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 43
        },
        {
            "vendorCode": "HB3-F-8N",
            "price": 215.56,
            "rating": 804,
            "typeRating": 70.5,
            "purchasedQuantity": 161,
            "numberOfOrders": 14,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 52
        },
        {
            "vendorCode": "HB2-B3-H-10M-R",
            "price": 177.73,
            "rating": 773,
            "typeRating": 70.5,
            "purchasedQuantity": 415,
            "numberOfOrders": 6,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": null
        },
        {
            "vendorCode": "HB1-H-3M",
            "price": 112.21,
            "rating": 773,
            "typeRating": 70.5,
            "purchasedQuantity": 270,
            "numberOfOrders": 16,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 138
        },
        {
            "vendorCode": "HB3-H-12M-PK",
            "price": 239.46,
            "rating": 663,
            "typeRating": 70.5,
            "purchasedQuantity": 138,
            "numberOfOrders": 6,
            "maxTemperature": 232,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 68
        },
        {
            "vendorCode": "HB2-B3-F-4N",
            "price": 120.55,
            "rating": 643,
            "typeRating": 70.5,
            "purchasedQuantity": 168,
            "numberOfOrders": 21,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 28
        },
        {
            "vendorCode": "HB1-H-2T",
            "price": 112.21,
            "rating": 584,
            "typeRating": 70.5,
            "purchasedQuantity": 202,
            "numberOfOrders": 17,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 6
        },
        {
            "vendorCode": "HB3-H-8T",
            "price": 229.72,
            "rating": 555,
            "typeRating": 70.5,
            "purchasedQuantity": 73,
            "numberOfOrders": 7,
            "maxTemperature": 148,
            "minTemperature": -54,
            "workingPressure": 414,
            "quantityInStock": 18
        }
    ],
    currentPage: 1,
    availablePages: 13
}

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

export interface physicalCharacteristics {
    cv?: number,
    dn?: number,
    minTemperature?: number,
    maxTemperature?: number,
    minPressure?: number,
    maxPressure?: number,
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

export type productsTable = {
    soldProducts: soldProducts[],
    currentPage: number,
    availablePages: number
}

export interface soldProducts {
    vendorCode: string,
    price: number | null,
    rating: number | null,
    typeRating: number | null,
    purchasedQuantity: number | null,
    numberOfOrders: number | null,
    maxTemperature: number | null,
    minTemperature: number | null,
    workingPressure: number | null,
    quantityInStock: number | null,
}

export type page = {
    sizePage: number,
    currentPage: number,
    // limitPage: number,
}

async function fetchData(): Promise<optionsData> {
    return await fetch(`http://192.168.0.178:5050/products/options?fetchDataFirst`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

function sendDataForOptions(filter: sendData) {
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

function sendDataForProduct(filter: sendData, page: page) {

    // TODO: currentPage and sizePage

    fetch(`http://192.168.0.178:5050/products/sold?PageId=${page.currentPage}&PageSize=${page.sizePage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(filter)
    })
        .then(async response => {
            let result = await response.json()
            console.log('table', result)
            // TODO setPage(limitPage)
        })
}



export function CalcPage(): JSX.Element {
    const [filter, setFilter] = useState<sendData>({})
    const [data, setData] = useState<optionsData | undefined>()

    // TODO: доделать
    const [prodTable, setProdTable] = useState<productsTable | undefined>(testProd)
    const [page, setPage] = useState<page>({sizePage: 20, currentPage: 1})
    const [showTable, setShowTable] = useState<boolean>(true)


    useEffect(() => {
        (async () => {
            setData(await fetchData())
        })()
    }, [])


    useEffect(() => {

        if (data){
            console.log({filter})
            sendDataForOptions(filter)
            sendDataForProduct(filter, page)
        }

    }, [filter]);


    function onChangeChar(chars: physicalCharacteristics) {
        console.log('chars', chars)
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
        {
            showTable && <section className='table-wrap'>
                <Table productsTable={prodTable} />
                <Pagination page={page} />
            </section>
        }
    </>
}