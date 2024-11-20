import { FC } from "react";
import { productDataArticle } from "../../types/Types.tsx";

interface TableProdProps {
    data: productDataArticle,
    className: string
}

export const TableProd: FC<TableProdProps> = ({data, className}) => {
    return data.historyPrices.length > 1 && <table className={className}>
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