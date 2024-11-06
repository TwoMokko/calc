import {sendData} from "../types/Types.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const UseSearchFilterParams = (): [sendData, (value: (((prevState: sendData) => sendData) | sendData)) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentFilter, setCurrentFilter] = useState<sendData>({})

	useEffect(() => {
		changeFilter()
		console.log('change search params')
	}, [searchParams]);

	useEffect(() => {
		changeSearchParams(currentFilter)
	}, [currentFilter]);

	const changeSearchParams = (filter: sendData) => {

		// if (!filter.type) {
		// 	console.log('not filter')
		// 	// searchParams.delete('type')
		// 	setSearchParams({})
		// 	return
		// }

		// setSearchParams(prev => {
		// 	return {...prev, productType:  filter.productType}
		// })
		// setSearchParams(prev => {
		// 	return {...prev, type:  filter.type}
		// })

		let obj: {[key: string]: string[] | string} = {}

		if (filter.type) obj['type'] = filter.type
		if (filter.productType) obj['productType'] = filter.productType

		filter.options?.map(opt => {
			obj[`opt-${opt.key}`] = opt.value
		})

		if (filter.physicalCharacteristics) for (const [key, value] of Object.entries(filter.physicalCharacteristics)) {
			obj[key] = value
		}

		filter.connections?.map(conn => {
			if (conn.connectionNo) {
				if (conn.connectionType) obj[`${conn.connectionNo}-connectionType`] = conn.connectionType
				if (conn.connectionSize) obj[`${conn.connectionNo}-connectionSize`] = conn.connectionSize
			}
		})

		setSearchParams(obj)
		setCurrentFilter(filter)
	}

	const changeFilter = () => {
		// const testType: sendData = {type: []}
		// for (const entry of searchParams.entries()) {
		// 	const [param, value] = entry;
		//
		// 	if (param == 'type') {
		// 		testType.type?.push(value)
		// 	}
		//
		// 	// if (param == 'type') typeTest.type?.push(value)
		// 	// if (param == 'productType') typeTest.productType?.push(value)
		// }
		// setCurrentFilter(testType)
	}

	return [currentFilter, setCurrentFilter]
}

export default UseSearchFilterParams;