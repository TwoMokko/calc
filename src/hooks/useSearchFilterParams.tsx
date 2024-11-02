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

		if (filter.type) {
			const filt: { [key: string]: string | string[] } = {
				type: filter.type
			}
			console.log({filt})
			setSearchParams(filt)
			setCurrentFilter(filter)
		}
		// filt['assembly'] = 'A'

		// console.log(filter.type)
		// filt['type'] = filter.type ?? []
		// filt['productType'] = filter.productType ?? []



		//
		// console.log('changeSearchParams', filter)
	}

	const changeFilter = () => {
		const testType: sendData = {type: []}
		for (const entry of searchParams.entries()) {
			const [param, value] = entry;

			if (param == 'type') {
				testType.type?.push(value)
			}

			// if (param == 'type') typeTest.type?.push(value)
			// if (param == 'productType') typeTest.productType?.push(value)
		}
		setCurrentFilter(testType)
	}

	return [currentFilter, setCurrentFilter]
}

export default UseSearchFilterParams;