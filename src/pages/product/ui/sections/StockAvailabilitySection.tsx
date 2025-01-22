import { FC, ReactNode } from "react";
import { TableProd } from "../TableProd.tsx";
import { productData } from "../../config/types.ts";

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
							data={data.stockAvailability}
							className='table'
							columnsHead={['Артикул', 'Место хранения', 'Общее количество', 'Отложено', 'Ожидается', 'Свободное кол-во', 'Полочный остаток']}
						/>
					</div>
				</div>
			}
		</section>
}