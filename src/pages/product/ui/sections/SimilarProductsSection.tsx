import { FC, ReactNode } from "react";
import { similarProductData } from "../../config/types.ts";

interface SimilarProductsSectionProps {
	data: similarProductData[]
}

const SimilarProductsSection: FC<SimilarProductsSectionProps> = ({ data }): ReactNode => {
	return <section className='section'>
		<h2>Похожие товары</h2>
		<div className='product-similar-wrap'>
			{
				// вынести <a> в компонент card
				data.map(itm => <a key={itm.vendorCode} className='product-similar-card' href={`/prod/${itm.vendorCode}`}>
					<div className='product-similar-card-img'>
						<img alt='prod-img' src={`/img/configuration/${itm.img}`}/>
					</div>
					<div className='product-similar-card-info'>
						<h3>{itm.vendorCode}</h3>
						<div>
							{ itm.properties.map(prop => <div className='product-similar-card-info-row'>
								<div>{ prop.name }</div>
								<div>{ prop.value }</div>
							</div>)}
						</div>
					</div>
				</a>)
			}
		</div>
	</section>
}

export default SimilarProductsSection