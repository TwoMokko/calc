import { FC, ReactNode } from "react";
import TableProd from "../TableProd.tsx";

interface HistoryPriceSectionProps {
	data: {
		purchasePrice: number,
		datePrice: string,
		namePriceFor: string,
		quantity: number
	}[]
}

const HistoryPriceSection: FC<HistoryPriceSectionProps> = ({data}): ReactNode => {
	// if (!data) return <></>

	return <div className='product-history-price-wrap'>
		<TableProd
			data={Object.values(data)}
			className='table'
			columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
		/>
	</div>
}

export default HistoryPriceSection
