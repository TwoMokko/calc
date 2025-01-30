import { domains } from "../../../app/types/global.ts";
import { dataForTableDownLoadModelsItem } from "../config/types.ts";

export const getDataForTableDownload = async (vendorCodes: string[]): Promise<dataForTableDownLoadModelsItem[]> => {
	return await fetch(`${domains.MODELS}/api/v1/models`, {
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