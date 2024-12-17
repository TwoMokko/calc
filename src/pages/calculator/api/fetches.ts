import {optionsData, productsTable, sendData, TreeDataNodes} from "../../../shared/api/models.ts";
import {domains} from "../../../app/types/global.ts";

/* Запрос на получение данных для отрисовки DOM (?fetchDataFirst) */
export const fetchData = async (): Promise<optionsData> => {
	return await fetch(`${domains.FILTER}/products/options?fetchDataFirst`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({})
	}).then(res => res.json())
}

/* Запрос на получение данных для перерисовки DOM */
export const sendDataForOptions = (filter: sendData, highlight: Function) => {
	fetch(`${domains.FILTER}/products/options`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(filter),

	})
		.then(async response => {
			const result = await response.json()
			highlight(result)
		})
}

/* Запрос на получение данных для отрисовки select tree,
inputValue - это строка, которую вводит пользователь в input Типа продукции,
 далее обновляется дерево выпадающего списка */
export const getTypeProducts = async (inputValue: string): Promise<TreeDataNodes> => {
	return await fetch(`${domains.FILTER}/products/types${inputValue ? '?query=' + inputValue : ''}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	}).then(res => res.json())
		.catch(error => console.log(error))
}

/* Запрос на получение данных для отрисовки и перерисовки таблицы */
export const sendDataForProductTable = async (filter: sendData, currentPage: number, sizePage: number, sortState: string, outputListState: string, controller: AbortController): Promise<productsTable> => {
	return await fetch(`${domains.FILTER}/products/sold?PageId=${currentPage}&PageSize=${sizePage}&State=${sortState}&OutputListState=${outputListState}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(filter),
		signal: controller.signal
	})
		.then(async response => {
			return await response.json()
		})
}