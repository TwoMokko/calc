import {domains} from "../../../app/types/global.ts";
import {productData} from "../../../app/types/types.ts";

/* Запрос на получение данных для отрисовки страницы товара продукции по артикулу */
export const getDataForProduct = async (string: string): Promise<productData> => {
	return await fetch(`${domains.PRODUCT}/api/Specification/${string}`)
		.then(async response => {
			return await response.json()
		})
}


export const getFileModel = async (vendorCode: string, callBack: () => void): Promise<any> => {
	return await fetch(`${domains.MODELS}/api/v1/models/load/${vendorCode}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	}).then(res => {
		res.ok ? callBack() : alert(`response status: ${res.status}`)
	})
		.catch(error => console.log(error, 'aaa'))
	// console.log(vendorCode)
	// return await fetch(`${domains.MODELS}/api/v1/models/load/cmc-8m-8r`, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json;charset=utf-8'
	// 	}
	// }).then(res => {
	// 	if (res.ok) callBack()
	// })
	// 	.catch(error => console.log(error, 'aaa'))
}
