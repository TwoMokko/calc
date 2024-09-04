import {productDataArticle} from "../../types/Types.tsx";

export function TableProd({data, className}: {data:  productDataArticle, className: string}) {
    return <table className={className}>
        <thead>
        <tr>
            <th>Цена закупки</th>
            <th>Дата</th>
            <th>Источник</th>
            <th>Количество</th>
        </tr>
        </thead>
        <tbody>
        {
            data.historyPrices.map((tr, trId: number) => {
                return <tr key={trId}>
                    {Object.values(tr).map((td: string | number, tdId: number) => {
                        return <td key={tdId}>{td}</td>
                    })}
                </tr>
            })
        }
        </tbody>
    </table>
}