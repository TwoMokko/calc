import { TableProd } from "../TableProd.tsx";
import { FC, ReactNode } from "react";
import { productData } from "../../../../shared/api/models.ts";

interface HistoryPriceSectionProps {
	data: productData
}

export const HistoryPriceSection: FC<HistoryPriceSectionProps> = ({data}): ReactNode => {
		return <>
			{
				(data.buildArticul && data.buildArticul.historyPrices.length > 0 || data.buildArticul && data.buildArticul.historyPrices.length > 0) &&
                <div className='product-history-price-wrap'>

					{
						data.bodydArticul && data.bodydArticul.historyPrices.length > 0 && <div>
                            <h3>{data.bodydArticul.nameTable}</h3>
                            <TableProd
                                data={Object.values(data.bodydArticul.historyPrices)}
                                className='table'
                                columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
                            />
                        </div>
					}
					{
						data.buildArticul && data.buildArticul.historyPrices.length > 0 && <div>
                            <h3>{data.buildArticul.nameTable}</h3>
                            <TableProd
                                data={Object.values(data.buildArticul.historyPrices)}
                                className='table'
                                columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
                            />
                        </div>

					}
                </div>
			}
		</>
}