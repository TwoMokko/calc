import { TableProd } from "../TableProd.tsx";
import { FC, ReactNode } from "react";
import { productDataArticle} from "../../../../shared/api/models.ts";

interface HistoryPriceSectionProps {
	data: productDataArticle
}

export const HistoryPriceSection: FC<HistoryPriceSectionProps> = ({data}): ReactNode => {
	// if (!data) return <></>

	return <div className='product-history-price-wrap'>
		<TableProd
			data={Object.values(data.historyPrices)}
			className='table'
			columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
		/>
	</div>
}