import { FiSearch } from "react-icons/fi";
import React, { FC, useState } from "react";
import { sendData } from "../config/types.ts";
import { getFilterDataFromVendorCode } from "../api/fetches.ts";

interface SearchVendorCodeProps {
	updateFilter: (dataForFiler: sendData) => void
}

export const SearchVendorCode: FC<SearchVendorCodeProps> = ({ updateFilter }) => {
	const [vendorCode, setVendorCode] = useState<string>('')

	const doSearch = async () => {
		if (!vendorCode) return
		updateFilter(await getFilterDataFromVendorCode(vendorCode))
	}

	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') doSearch()
	}

	return <div>
		<h4>Поиск по артикулу</h4>
		<div className='input-wrap'>
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
