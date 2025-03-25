import { domains } from "../../../app/model/global.ts";
import { dataForTableDownLoadModels } from "../model/types.ts";

/* Отправляется список (массив строк) артикулов,
приходит ответ с артикулами, которые нельзя скачать
и со списком артикулов с доп данными, модели которых скачать можно */
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

/* Запрос на проверку, можно ли вообще скачать модель по определенному артикулу
(получаю ответ и после либо запускаю скачивание, либо показываю статус ошибка) */
export const getStatusDownloadFileModel = async (vendorCode: string, callBack: () => void): Promise<any> => {
	return await fetch(`${domains.MODELS}/api/v1/models/load/${vendorCode}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	}).then(res => {
		res.ok ? callBack() : alert(`response status: ${res.status}`)
	})
		.catch(error => console.log(error, 'aaa'))
}