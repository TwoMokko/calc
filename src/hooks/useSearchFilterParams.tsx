import {sendData} from "../types/Types.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const UseSearchFilterParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentFilter, setCurrentFilter] = useState<sendData | undefined>()

	useEffect(() => {
		changeFilter()
	}, [searchParams]);

	const changeSearchParams = (filter: sendData) => {
		const filt: {[key: string]: string | string[]} = {}
		filt['assembly'] = 'A'

		let typeTest: string[] = []
		filter.type?.map(t => { t !== undefined && typeTest.push(t) })
		if (typeTest.length > 0) filt['type'] = typeTest

		setSearchParams(filt)
	}

	const changeFilter = () => {

		let typeTest: string[] = []
		// if (typeof searchParams.get('type') == 'string') typeTest.push(searchParams.get('type'))
		typeTest.push("CBFU")

		const newFilter = { type: typeTest }
		setCurrentFilter(newFilter)
	}

	return [currentFilter, changeSearchParams]
}

export default UseSearchFilterParams;