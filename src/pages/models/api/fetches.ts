import { domains } from "../../../app/types/global.ts";
import { dataForTableDownLoadModels } from "../config/types.ts";

export const getDataForTableDownload = async (vendorCodes: string[]): Promise<dataForTableDownLoadModels> => {
	return await fetch(`${domains.PRODUCT}/api/_3DModels`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(vendorCodes),
	})
		.then(res => res.json())
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