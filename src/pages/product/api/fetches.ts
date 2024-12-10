import {domains} from "../../../app/types/global.ts";
import {productData} from "../../../shared/api/models.ts";

/* Запрос на получение данных для отрисовки страницы товара продукции по артикулу */
export const getDataForProduct = async (string: string): Promise<productData> => {
	return await fetch(`${domains.PRODUCT}/api/Specification/${string}`)
		.then(async response => {
			return await response.json()
		})
}
