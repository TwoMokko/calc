import { FC } from "react";

interface TableProdProps {
    data: {[key: string]: string | number}[],
    className: string,
    columnsHead: string[],
}

export const TableProd: FC<TableProdProps> = ({data, className, columnsHead}) => {
    return data.length > 0 && <table className={className}>
        <thead>
        <tr>
            { columnsHead.map(title => <th key={title}>{ title }</th>) }
        </tr>
        </thead>
        <tbody>
        {
            data.map((tr, trId: number) => {
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