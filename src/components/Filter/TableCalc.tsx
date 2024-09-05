import {Link} from "react-router-dom";
import {sendData, soldProducts} from "../../types/Types.tsx";
import {useEffect, useState} from "react";
import {sendDataForProductTable} from "../../api/Fetches.tsx";
import {Pagination} from "../Pagination.tsx";

export function TableCalc({filter, defaultPage, defaultSize}: { filter: sendData, defaultSize?: number, defaultPage?: number}):  JSX.Element {
    const [page, setPage] = useState(defaultPage ?? 1)
    const [size, setSize] = useState(defaultSize ?? 20)
    const [limit, setLimit] = useState(1)
    const [rows, setRows] = useState<soldProducts[]>([])


    useEffect(() => {
        (async () => {
            const result = await sendDataForProductTable(filter, page, size)
            setRows(result.soldProducts)
            setLimit(result.availablePages)
        })()

    }, [filter, page, size]);

    if (!rows?.length) return <div className='not-found'>По вашему запросу ничего не найдено, измените данные поиска</div>

    return <>
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
            size={size}
            limit={limit}

            onChangeSize={size => setSize(size)}
            onChangePage={page => setPage(page)}
        />
    </>
}