import {Link} from "react-router-dom";
import {sendData, soldProducts} from "../../types/Types.tsx";
import {useEffect, useState} from "react";
import {sendDataForProductTable} from "../../api/Fetches.tsx";
import {Pagination} from "../Pagination.tsx";
import {TiThMenu} from "react-icons/ti";

export function TableCalc({filter, defaultPage, defaultSize}: { filter: sendData, defaultSize?: number, defaultPage?: number}):  JSX.Element {
    const [page, setPage] = useState(defaultPage ?? 1)
    const [size, setSize] = useState(defaultSize ?? 20)
    const [limit, setLimit] = useState(1)
    const [rows, setRows] = useState<soldProducts[]>([])

    async function updateTable(page: number): Promise<void> {
        const result = await sendDataForProductTable(filter, page, size)
        setRows(result.soldProducts)
        setLimit(result.availablePages)
        setPage(page)
    }

    useEffect(() => {
        updateTable(1)
    }, [filter, size])

    useEffect(() => {
        updateTable(page)
    }, [page])


    function validateSize(val:  string) {
        let size = parseInt(val ? val : '0')
        if (size < 5)
            size = 5

        if (size > 100)
            size = 100

        setSize(size)
    }

    if (!rows?.length) return <div className='not-found'>По вашему запросу ничего не найдено, измените данные поиска</div>

    return <>
        <div className='table-size'>
            <div className='table-size-head'>Результат</div>
            <div>
                <h4>Количество строк</h4>
                <div className='table-size-input'>
                    <TiThMenu
                        width='20px'
                        height='20px'
                    />
                    <input
                        type='number'
                        className='page-size-input'
                        defaultValue={size}
                        onBlur={(event) => {
                            validateSize(event.currentTarget.value)
                        }}
                    />
                </div>
            </div>
        </div>


        <table
            className='table'
        >
            <thead>
            <tr>
                <th>Артикул</th>
                <th>На складе</th>
                <th>Давление</th>
                <th>Мин температура</th>
                <th>Макс температура</th>
                <th>Рейтинг типа</th>
                <th>Рейтинг самого товара</th>
                <th>Количество заказов</th>
                <th>Количество купленных</th>
                <th>Цена</th>
            </tr>
            </thead>
            <tbody>
            {rows.slice(0, size).map((itm: soldProducts, id: number) => {
                return <tr key={id}>
                    <td>
                        <Link
                            to={`/prod/${itm.vendorCode}`}
                        >
                            {itm.vendorCode}
                        </Link>
                    </td>
                    <td>{itm.quantityInStock}</td>
                    <td>{itm.workingPressure}</td>
                    <td>{itm.minTemperature}</td>
                    <td>{itm.maxTemperature}</td>
                    <td>{itm.typeRating}</td>
                    <td>{itm.rating}</td>
                    <td>{itm.numberOfOrders}</td>
                    <td>{itm.purchasedQuantity}</td>
                    <td>{itm.price}</td>
                </tr>
            })}
            </tbody>
        </table>
        <Pagination
            page={page}
            limit={limit}

            onChangePage={page => setPage(page)}
        />
    </>
}