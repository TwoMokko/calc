import { FiSearch } from "react-icons/fi";
import React, { FC, useState } from "react";
import { sendData } from "../../../features/calculator/model/types.ts";
import { getFilterDataFromVendorCode } from "../../../features/calculator/api/fetches.ts";

interface SearchVendorCodeProps {
	updateFilter: (dataForFiler: sendData) => void
}

const SearchVendorCode: FC<SearchVendorCodeProps> = ({ updateFilter }) => {
	/** Constants */
	const [vendorCode, setVendorCode] = useState<string>('')										// Состояние со значением в поле input
	const [incorrectVendorCode, setIncorrectVendorCode] = useState<boolean>(false)				// Флаг, проверка результата (данные для filter)

	/** Constants (functions) */
	/* Поиск по строке (поле ввода в input) */
	const doSearch = async () => {
		// Если поле пустое, то не отправлять запрос
		if (!vendorCode.trim()) return

		// Отправка запроса на получение данных, которыми потом заполнится фильтр, а при изменении фильтра обновятся url и таблица
		await getFilterDataFromVendorCode(vendorCode).then((result: sendData) => {
			console.log({result})
			setIncorrectVendorCode(Object.keys(result).length <= 0)
			updateFilter(result)
		})

	}

	/* Вызов поиска на Enter  */
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
