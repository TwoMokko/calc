import {physicalCharacteristics, sendData} from "../types/Types.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

type UpdateFilter = ((prevState: sendData) => sendData) | sendData

const UseSearchFilterParams = (): [sendData, (changedFilter: UpdateFilter, where?: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filter, setFilter] = useState<sendData>({})				// данные такие, как filter в calcPage

	/* Эта функция нужна, чтобы узнать, где именно вызывается setFilter, если раскомментировать where */
	const updateFilter = (changedFilter: UpdateFilter/*, where?: string*/) => {
		// Консоль с выводом названия функции, где вызывается setFilter
		// console.log({changedFilter, where})
		setFilter(typeof changedFilter == 'function' ? changedFilter(filter) : changedFilter)
	}

	/* При изменении searchParams вызывается функция для обновления filter */
	useEffect(() => {
		updateFilterFromSearchParams()
	}, [searchParams]);

	/* При изменении filter вызывается функция для обновления searchParams */
	useEffect(() => {
		changeSearchParams()
	}, [filter]);


	/* Изменение searchParams по данным из filter */
	const changeSearchParams = () => {
		// Если filter пустой, то сделать searchParams пустыми тоже
		if (!Object.keys(filter).length) {
			setSearchParams({})
			return;
		}

		// Создание промежуточного объекта, который в дальнейшем наполняется данными
		let obj: {[key: string]: string[] | string} = {}

		// Если есть type, typeProduct записать из в промежуточный объект под одноименным ключом со значением ввиде строки (через точку, заменяя пробелы на нижнее подчеркивание)
		if (filter.type) obj['type'] = filter.type.join('.')
		if (filter.productType) obj['productType'] = filter.productType.join('.').replaceAll(' ', '_')

		// Запись в промежуточный объект элемент (опцию) с ключом filter.options[key] с приставкой opt- со значением из filter.options[key]
		filter.options?.map(opt => {
			obj[`opt-${opt.key}`] = opt.value
		})

		// Запись в промежуточный объект элемент (характеристику) с ключом filter.physicalCharacteristics[key] с приставкой char- со значением из filter.physicalCharacteristics[key]
		if (filter.physicalCharacteristics) for (const [key, value] of Object.entries(filter.physicalCharacteristics)) {
			if (value)
				obj[`char-${key}`] = value
		}

		// Запись в промежуточный объект элемент (подсоединение) с ключом filter.connections.connectionNo с приставкой conn- с составным значением: размер и тип, соединенные через точку (если нет одного, то и точки нет)
		filter.connections?.map(conn => {
			if (conn.connectionNo) {
				const val = (conn.connectionType ? conn.connectionType : '') +  (conn.connectionSize ? '.' + conn.connectionSize : '')
				if (val != '.') obj[`conn-${conn.connectionNo}`] = val
			}
		})


		// Обновить searchParams на данные, собранные в промежуточный объект (obj)
		setSearchParams(obj)
		// Обновить фильтр, надо ли?
		updateFilter(filter)
	}

	/* Изменение filter по данным из searchParams */
	const updateFilterFromSearchParams = () => {
		// Создание промежуточного объекта, который в дальнейшем наполняется данными
		const tempFilter: sendData = {}

		// Получение всех параметров через entries, который возвращает пары ключ/значение. Цикл по этим парам
		for (const [param, value] of searchParams.entries()) {

			// Если парметр имеет ключ type, преобразовать value в массив строк,
			// разделив через сепаратор точку, и присвоить ключу type в промежуточном объекте
			if (param == 'type') tempFilter.type = value.split('.')

			// Если парметр имеет ключ productType, преобразовать value в массив строк,
			// разделив через сепаратор точку (сначала заменив нижнее подчеркивание на пробел)
			// и присвоить ключу productType в промежуточном объекте
			if (param == 'productType') tempFilter.productType = value.replaceAll('_', ' ').split('.')

			// Если параметр начинается на conn-
			if (param.startsWith('conn-')) {
				const connectionNo = parseInt(param.substring(5))
				if (!connectionNo)
					continue;

				if (!tempFilter.connections)
					tempFilter.connections = []

				const [type, size] = value.replace('.', 'SPLIT_ME_HERE').split('SPLIT_ME_HERE')
				let connection = tempFilter.connections?.find(connect => connect.connectionNo == connectionNo)

				if (!connection) {
					connection = {connectionNo}
					tempFilter.connections?.push(connection)
				}
				if (type) connection.connectionType = type
				if (size) connection.connectionSize = size
			}

			// Если параметр начинается на opt-
			if (param.startsWith('opt-')) {
				const key = param.substring(4)

				if (!tempFilter.options)
					tempFilter.options = []

				tempFilter.options?.push({key, value})
			}

			// Если параметр начинается на char-
			if (param.startsWith('char-')) {
				const key = param.substring(5) as keyof physicalCharacteristics
				if (!tempFilter.physicalCharacteristics)
					tempFilter.physicalCharacteristics = {}

				tempFilter.physicalCharacteristics[key] = parseInt(value)
			}
		}

		updateFilter(tempFilter)
	}

	/* Хук возвращает текущий/промежуточный filter и функцию для обновления текущего/промежуточного filter */
	return [filter, updateFilter]
}

export default UseSearchFilterParams;