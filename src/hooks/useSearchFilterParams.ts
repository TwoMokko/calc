import useSearchController from "./useSearchController.ts";
import {FilterOptionType, sendData} from "../types/Types.tsx";
import {useEffect, useState} from "react";
import {ru} from "../data/Languages.tsx";

type UpdateFilter = ((prevState: sendData) => sendData) | sendData

export const useSearchFilterParams = (): [sendData, (changedFilter: UpdateFilter, where?: string) => void] => {
	const [url, setUrl] = useSearchController()
	const [filter, setFilter] = useState<sendData>({})



	useEffect(() => {
		const tempFilter: sendData = {}
		tempFilter.connections = []
		tempFilter.options = []
		console.log({url})

		for (const [urlKey, urlValue] of Object.entries(url)) {
			if (!urlValue) continue

			switch (ru[urlKey].type) {
				case FilterOptionType.CONNECTION_TYPE:
				case FilterOptionType.CONNECTION_SIZE:
					let connection = tempFilter.connections.find(connection => connection.connectionNo == ru[urlKey].index)
					if (!connection) {
						connection = {connectionNo: ru[urlKey].index}
						tempFilter.connections.push(connection)
					}
					connection[ru[urlKey].type == FilterOptionType.CONNECTION_TYPE ? 'connectionType' : 'connectionSize'] = urlValue
					break;
				case FilterOptionType.OPTION:
					const key: string = urlKey
					const value: string = urlValue
					tempFilter.options?.push({key, value})
					break;
			}
		}

		setFilter(tempFilter)
	}, [url]);

	const updateFilter = (changedFilter: UpdateFilter) => {
		setFilter(typeof changedFilter == 'function' ? changedFilter(filter) : changedFilter)
	}

	useEffect(() => {
		for (const [urlKey, value] of Object.entries(ru)) {
			switch (ru[urlKey].type) {
				case FilterOptionType.CONNECTION_TYPE:
				case FilterOptionType.CONNECTION_SIZE:
					const connection = filter.connections?.find(itm => itm.connectionNo == value.index)
					setUrl(urlKey, connection ? connection[value.type == FilterOptionType.CONNECTION_TYPE ? 'connectionType' : 'connectionSize']: undefined)

					break;
				case FilterOptionType.OPTION:
					const option = filter.options?.find(itm => itm.key == urlKey)

					setUrl(urlKey, option?.value ? option.value : '')
					if (filter.options?.hasOwnProperty(urlKey)) {}
					break;
			}
		}
	}, [filter]);

	return [filter, updateFilter]
}
