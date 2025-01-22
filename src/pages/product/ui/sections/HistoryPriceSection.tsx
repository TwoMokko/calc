import { TableProd } from "../TableProd.tsx";
import { FC, ReactNode } from "react";

interface HistoryPriceSectionProps {
	data: {
		purchasePrice: number,
		datePrice: string,
		namePriceFor: string,
		quantity: number
	}[]
}

export const HistoryPriceSection: FC<HistoryPriceSectionProps> = ({data}): ReactNode => {
	// if (!data) return <></>

	return <div className='product-history-price-wrap'>
		<TableProd
			data={Object.values(data)}
			className='table'
			columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
		/>
	</div>
}