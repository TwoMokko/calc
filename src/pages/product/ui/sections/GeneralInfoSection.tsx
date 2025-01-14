import { FC, ReactNode } from "react";
import { productData } from "../../../../app/types/types.ts";
import { String } from "../../../../shared/ui/String.tsx";
import { CgClose } from "react-icons/cg";
import { PiEqualsBold } from "react-icons/pi";


interface CharacteristicSectionProps {
	data: productData
}

export const GeneralInfoSection: FC<CharacteristicSectionProps> = ({data}): ReactNode => {
	return <>
		<section className='product-info block-prod section'>
			<h2>Общая информация</h2>
			<String head='Артикул' string={data.rightArticul}/>
			<String head='Полное наименование' string={data.title}/>
			<String head='Строка для 1С' string={data.oneCString}/>
			{/*<String head='Наличие на складе' string={getStockString(data)} className='stock'/>*/}
			<String head='Данные о цене'
					string={`${data.priceInfo.priceForClient}${data.priceInfo.priceFrom ? ` (${data.priceInfo.priceFrom})` : ''}`}/>

			<div className='product-price-calculator'>
				<h4>Расчет стоимости</h4>
				<div>
					{/*TODO:оптимизировать*/}
					<div>
						<h3>{data.priceInfo.purchasePrice}</h3>
						<div>Закупочная цена</div>
					</div>
					<div className='sign'>
						<CgClose/>
					</div>
					<div>
						<h3>{data.priceInfo.coefficientForProductionAndDistribution}</h3>
						<div>Коэффициент транспортных расходов</div>
					</div>
					<div className='sign'>
						<CgClose/>
					</div>
					<div>
						<h3>{data.priceInfo.marginFactor}</h3>
						<div>Коэффициент наценки</div>
					</div>
					<div className='sign'>
						<CgClose/>
					</div>
					<div>
						<h3>{data.priceInfo.salesRatio}</h3>
						<div>Коэффициент продаж</div>
					</div>
					<div className='sign'>
						<PiEqualsBold/>
					</div>
					<div>
						<h3>{data.priceInfo.priceForClient}</h3>
						<div>Стоимость для клиента</div>
					</div>
				</div>
			</div>
		</section>
	</>
}