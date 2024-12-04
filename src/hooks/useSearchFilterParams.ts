import useSearchController, {UrlProps} from "./useSearchController.tsx";
import {FilterOptionType, physicalCharacteristics, sendData} from "../types/Types.tsx";
import {useEffect, useState} from "react";
import {ru} from "../data/Languages.tsx";

type UpdateFilter = ((prevState: sendData) => sendData) | sendData

export const useSearchFilterParams = (): [sendData, (changedFilter: UpdateFilter, where?: string) => void] => {
	const {urls, set} = useSearchController()
	const [filter, setFilter] = useState<sendData | undefined>(undefined)


	useEffect(() => {
		const tempFilter: sendData = {
			connections: [],
			options: [],
			physicalCharacteristics: {}
		}

		for (const [urlKey, urlValue] of Object.entries(urls)) {
			if (!urlValue) continue

			switch (ru[urlKey].type) {
				case FilterOptionType.CONNECTION_TYPE:
				case FilterOptionType.CONNECTION_SIZE:
					let connection = tempFilter.connections?.find(connection => connection.connectionNo == ru[urlKey].index)
					if (!connection) {
						connection = {connectionNo: ru[urlKey].index}
						tempFilter.connections?.push(connection)
					}
					connection[ru[urlKey].type == FilterOptionType.CONNECTION_TYPE ? 'connectionType' : 'connectionSize'] = urlValue
					break;
				case FilterOptionType.OPTION:
					tempFilter.options?.push({key: urlKey, value: urlValue})
					break;
				case FilterOptionType.CHARACTERISTIC:
					if (tempFilter.physicalCharacteristics)
						tempFilter.physicalCharacteristics[urlKey as keyof physicalCharacteristics] = parseInt(urlValue) // удалить если нет ничего?
					break;
				case FilterOptionType.TYPE:
					tempFilter.type = urlValue.split('.')
					break;
				case FilterOptionType.TYPE_PRODUCT:
					tempFilter.productType = urlValue.replaceAll('_', ' ').split('.')
					break;
			}
		}

		setFilter(tempFilter)
	}, [urls]);

	const updateFilter = (changedFilter: UpdateFilter/*, where?: string*/) => {
		// console.log({changedFilter, where})
		if (filter)
			setFilter(typeof changedFilter == 'function' ? changedFilter(filter) : changedFilter)
	}

	useEffect(() => {
		if (!filter)
			return;

		const temp: UrlProps = {}

		for (const [urlKey, value] of Object.entries(ru)) {
			switch (ru[urlKey].type) {
				case FilterOptionType.CONNECTION_TYPE:
				case FilterOptionType.CONNECTION_SIZE:
					const connection = filter.connections?.find(itm => itm.connectionNo == value.index)
					temp[urlKey] = connection ? connection[value.type == FilterOptionType.CONNECTION_TYPE ? 'connectionType' : 'connectionSize'] : undefined

					break;
				case FilterOptionType.OPTION:
					const option = filter.options?.find(itm => itm.key == urlKey)

					temp[urlKey] = option?.value ? option.value : ''
					if (filter.options?.hasOwnProperty(urlKey)) {}
					break;
				case FilterOptionType.CHARACTERISTIC:
					if (filter?.physicalCharacteristics && urlKey in filter?.physicalCharacteristics) {
						const char: number | undefined = filter.physicalCharacteristics[urlKey as keyof physicalCharacteristics]
						temp[urlKey] = char ? char.toString() : ''
					}
					break;
				case FilterOptionType.TYPE:
					temp[urlKey] = filter.type?.join('.')
					break;
				case FilterOptionType.TYPE_PRODUCT:
					temp[urlKey] = filter.productType?.join('.').replaceAll(' ', '_')
					break;
			}
		}

		set(temp)
	}, [filter]);

	return [filter ? filter : {}, updateFilter]
}
