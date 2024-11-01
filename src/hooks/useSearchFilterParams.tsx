import {sendData} from "../types/Types.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const UseSearchFilterParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentFilter, setCurrentFilter] = useState<sendData | undefined>()

	console.log({searchParams})

	useEffect(() => {
		changeFilter()
	}, [searchParams]);

	const changeSearchParams = (filter: sendData) => {

		// console.log('here:', filter)
		// const filt: {[key: string]: string | string[]}  = {
		// 	type: ['B112', 'B105' ]
		// }
		// // filt['assembly'] = 'A'
		//
		// // console.log(filter.type)
		// // filt['type'] = filter.type ?? []
		// // filt['productType'] = filter.productType ?? []
		//
		// setSearchParams(filt)
		// setCurrentFilter(filter)
		//
		// console.log('changeSearchParams', filter)
	}

	const changeFilter = () => {

		// console.log(currentFilter)
		if (!currentFilter) {
			// console.log('here')
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


		// console.log({typeTest})
		// setCurrentFilter(typeTest)
	}

	return [currentFilter, changeSearchParams]
}

export default UseSearchFilterParams;