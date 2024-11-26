import { useEffect, useState } from "react";
import { stateDefault } from "../components/Filter/TableCalc.tsx";
// import { useSearchParams } from "react-router-dom";
import useSearchAllParams, { searchParamsFrom } from "./useSearchAllParams.ts";

export type dataFromTable = {
	size: number,
	page: number,
	sort: string,
}

const UseSearchTableParams = (): [dataFromTable, (changeData: dataFromTable) => void] => {
	// const [searchParams, setSearchParams] = useSearchParams()
	const [searchParams, setSearchParams] = useSearchAllParams()
	const [data, setData] = useState<dataFromTable>({
		page: 1,
		size: 20,
		sort: stateDefault
	})

	useEffect(() => {
		updateData()
	}, [searchParams]);

	useEffect(() => {
		changeSearchParams()
	}, [data]);

	const changeSearchParams = () => {
		// for (const [key,  val] of Object.entries(data)) {
		// 	searchParams.set(key, val.toString())
		// }
		// setSearchParams(searchParams)
		setSearchParams(data, searchParamsFrom.FROM_TABLE)
	}

	const updateData = () => {
		const tempData: dataFromTable = {
			page: 1,
			size: 20,
			sort: stateDefault
		}

		for (const [param, value] of searchParams.entries()) {
			switch (param) {
				case 'size': tempData.size = parseInt(value); break
				case 'page': tempData.page = parseInt(value); break
				case 'sort': tempData.sort = value; break
				default: break
			}
		}

		setData(tempData)
	}

	return [data, setData]
}

export default UseSearchTableParams;