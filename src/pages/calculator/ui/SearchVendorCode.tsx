import { FiSearch } from "react-icons/fi";
import React, { FC, useState } from "react";
import { sendData } from "../config/types.ts";
import { getFilterDataFromVendorCode } from "../api/fetches.ts";

interface SearchVendorCodeProps {
	updateFilter: (dataForFiler: sendData) => void
}

export const SearchVendorCode: FC<SearchVendorCodeProps> = ({ updateFilter }) => {
	const [vendorCode, setVendorCode] = useState<string>('')
	const [incorrectVendorCode, setIncorrectVendorCode] = useState<boolean>(false)

	const doSearch = async () => {
		if (!vendorCode) return

		await getFilterDataFromVendorCode(vendorCode).then((result) => {
			console.log({result})
			setIncorrectVendorCode(!!result)
			updateFilter(result)
		})

	}

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') doSearch()
	}

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
};
