import {productsTable, soldProducts} from "../routes/CalcPage.tsx";

export function Table({productsTable}: { productsTable: productsTable | undefined}) {
    return <table
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
        {productsTable && productsTable.soldProducts.map((itm: soldProducts) => {
                return <tr>
                    <td>
                        <a
                            href='/prod'
                        >
                            {itm.vendorCode}
                        </a>
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
}