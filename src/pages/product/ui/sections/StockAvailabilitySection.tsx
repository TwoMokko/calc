import { FC, ReactNode } from "react";
import { TableProd } from "../TableProd.tsx";
import { productData } from "../../../../shared/api/models.ts";


interface StockAvailabilitySectionProps {
	data: productData
}

export const StockAvailabilitySection: FC<StockAvailabilitySectionProps> = ({data}): ReactNode => {
		return <section className='section'>
			{data.stockAvailability &&
				<div className='product-history-price-wrap'>
					<div>
						<h2>Наличие на складе</h2>
						<TableProd
							data={[{'1': '1', '2': 2, '3': '3', '4': 4, '5': '5'}, {
								'1': '1',
								'2': 2,
								'3': '3',
								'4': 4,
								'5': '5'
							}]}
							className='table'
							columnsHead={['Артикул', 'Место хранения', 'Общее количество', 'Отложено', 'Остатки на складе']}
						/>
					</div>
				</div>
			}
		</section>
}