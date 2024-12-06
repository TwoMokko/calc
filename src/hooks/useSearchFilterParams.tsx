import {physicalCharacteristics, sendData} from "../types/Types.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

type UpdateFilter = ((prevState: sendData) => sendData) | sendData

const UseSearchFilterParams = (): [sendData, (changedFilter: UpdateFilter, where?: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filter, setFilter] = useState<sendData>({})

	const updateFilter = (changedFilter: UpdateFilter/*, where?: string*/) => {
		// console.log({changedFilter, where})
		setFilter(typeof changedFilter == 'function' ? changedFilter(filter) : changedFilter)
	}

	useEffect(() => {
		updateFilterFromSearchParams()
	}, [searchParams]);

	useEffect(() => {
		changeSearchParams()
	}, [filter]);

	const changeSearchParams = () => {

		if (!Object.keys(filter).length) {
			setSearchParams({})
			return;
		}

		let obj: {[key: string]: string[] | string} = {}

		if (filter.type) obj['type'] = filter.type.join('.')
		if (filter.productType) obj['productType'] = filter.productType.join('.').replaceAll(' ', '_')

		filter.options?.map(opt => {
			obj[`opt-${opt.key}`] = opt.value
		})

		if (filter.physicalCharacteristics) for (const [key, value] of Object.entries(filter.physicalCharacteristics)) {
			if (value)
				obj[`char-${key}`] = value
		}

		filter.connections?.map(conn => {
			if (conn.connectionNo) {
				const val = (conn.connectionType ? conn.connectionType : '') +  (conn.connectionSize ? '.' + conn.connectionSize : '')
				if (val != '.') obj[`conn-${conn.connectionNo}`] = val
			}
		})


		setSearchParams(obj)
		updateFilter(filter)
	}

	const updateFilterFromSearchParams = () => {
		const tempFilter: sendData = {}

		for (const [param, value] of searchParams.entries()) {
			if (param == 'type')
				tempFilter.type = value.split('.')

			if (param == 'productType')
				tempFilter.productType = value.replaceAll('_', ' ').split('.')

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


			if (param.startsWith('opt-')) {
				const key = param.substring(4)

				if (!tempFilter.options)
					tempFilter.options = []

				tempFilter.options?.push({key, value})
			}

			if (param.startsWith('char-')) {
				const key = param.substring(5) as keyof physicalCharacteristics
				if (!tempFilter.physicalCharacteristics)
					tempFilter.physicalCharacteristics = {}

				tempFilter.physicalCharacteristics[key] = parseInt(value)
			}
		}

		updateFilter(tempFilter)
	}

	return [filter, updateFilter]
}

export default UseSearchFilterParams;