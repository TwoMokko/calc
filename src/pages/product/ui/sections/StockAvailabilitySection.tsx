import { FC, ReactNode } from "react";
import { productData } from "../../config/types.ts";
import TableProd from "../TableProd.tsx";

interface StockAvailabilitySectionProps {
	data: productData
}

const StockAvailabilitySection: FC<StockAvailabilitySectionProps> = ({data}): ReactNode => {
	return <section className='section'>
		{data.stockAvailability &&
			<div className='product-history-price-wrap'>
				<div>
					<h2>Наличие на складе</h2>
					<div className='table-wrap'>
						<TableProd
							data={data.stockAvailability}
							className='table'
							columnsHead={['Артикул', 'Место хранения', 'Общее количество', 'Отложено', 'Ожидается', 'Свободное кол-во', 'Полочный остаток']}
						/>
					</div>
				</div>
			</div>
		}
	</section>
}

export default StockAvailabilitySection