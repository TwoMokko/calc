import { domains } from "../../../app/model/global.ts";
import { productData } from "../config/types.ts";

/* Запрос на получение данных для отрисовки страницы товара продукции по артикулу */
export const getDataForProduct = async (string: string): Promise<productData> => {
	return await fetch(`${domains.PRODUCT}/api/Specification/${string}`)
		.then(async response => {
			return await response.json()
		})
}
