import {domains} from "../../../app/types/global.ts";
import {productData} from "../../../shared/api/models.ts";

/* Запрос на получение данных для отрисовки страницы товара продукции по артикулу */
export const getDataForProduct = async (string: string): Promise<productData> => {
	return await fetch(`${domains.PRODUCT}/api/Specification/${string}`)
		.then(async response => {
			return await response.json()
		})
}


export const getFileModel = async (vendorCode: string): Promise<any> => {
	return await fetch(`${domains.MODELS}/api/v1/models/load/${vendorCode}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	}).then(res => res.json())
		.catch(error => console.log(error))
}
