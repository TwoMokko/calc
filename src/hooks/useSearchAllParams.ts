import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export enum searchParamsFrom {
	FROM_FILTER = 1,
	FROM_TABLE = 2
}

export type sParams = { [key: string]: string | number }

const UseSearchAllParams = (): [URLSearchParams, (values:sParams, from: number) => void] => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filter, setFilter] = useState<sParams>()
	const [dataFromTable, setDataFromTable] = useState<sParams>()

	useEffect(() => {
		console.log({searchParams})
	}, [searchParams]);

	const changeSearchParams = (values: sParams, from: number): void => {
		let params = {}
		setSearchParams(params)

		switch (from) {
			case searchParamsFrom.FROM_FILTER:
				setFilter(values)
				console.log({values})
				params = Object.assign(values, dataFromTable)
				console.log('filt', params)
				setSearchParams(params)
				break
			case searchParamsFrom.FROM_TABLE:
				setDataFromTable(values)
				console.log('f:', filter) // undefined, где изначально взять? повернуть, и вызывать здесь searchFilterParams? (а не наоборот)
				params = Object.assign(values, filter)
				setSearchParams(params)
				break
			// default:
			// 	params = Object.assign(filter, dataFromTable)
			// 	break
		}

		// for (const [key,  val] of Object.entries(params)) {
		// 	if (typeof val == 'number') searchParams.set(key, val.toString())
		// 	if (typeof val == 'string') searchParams.set(key, val)
		// }
		// setSearchParams(searchParams)
	}

	return [searchParams, changeSearchParams]
}

export default UseSearchAllParams;
