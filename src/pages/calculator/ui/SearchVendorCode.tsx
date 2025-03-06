import { FiSearch } from "react-icons/fi";
import React, { FC, useState } from "react";
import { sendData } from "../config/types.ts";
import { getFilterDataFromVendorCode } from "../api/fetches.ts";

interface SearchVendorCodeProps {
	updateFilter: (dataForFiler: sendData) => void
}

const SearchVendorCode: FC<SearchVendorCodeProps> = ({ updateFilter }) => {
	/** Constants */
	/* TODO описать константы */
	const [vendorCode, setVendorCode] = useState<string>('')										//
	const [incorrectVendorCode, setIncorrectVendorCode] = useState<boolean>(false)				//

	/** Constants (functions) */
	/* TODO */
	const doSearch = async () => {
		if (!vendorCode) return

		await getFilterDataFromVendorCode(vendorCode).then((result: sendData) => {
			console.log({result})
			setIncorrectVendorCode(Object.keys(result).length <= 0)
			updateFilter(result)
		})

	}

	/* Вызов поиска на  */
	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') doSearch()
	}

	/** Build DOM */
	return <div>
		<h4>Поиск по артикулу</h4>
		<div className={`input-wrap ${incorrectVendorCode ? 'error' : ''}`}>
			<input
				onKeyUp={handleKeyUp}
				onInput={(event) => setVendorCode(event.currentTarget.value)}
				type='text'
			/>
			<FiSearch
				onClick={doSearch}
				className='cursor-pointer'
			/>
		</div>
	</div>
}

export default SearchVendorCode
