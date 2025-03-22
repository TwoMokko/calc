import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { sendData, soldProducts } from "../../../features/calculator/model/types.ts";
import { sendDataForProductTable } from "../../../features/calculator/api/fetches.ts";
import useSearchController from "../../../shared/hooks/useSearchController.tsx";
import TableSort from "./TableSort.tsx";
import TableSoldProd from "./TableSoldProd.tsx";
import Pagination from "../../../shared/ui/Pagination.tsx";

interface TableCalcProps {
	filter: sendData,
	defaultSize?: number,
	defaultPage?: number
}

const TableCalc: FC<TableCalcProps> = ({filter}): ReactNode => {
	/** Constants */
	const { urls: { page, sort, size, outputList }, setValue } = useSearchController()
	const [limit, setLimit] = useState<number>(1)																// Номер последней страницы (кол-во страниц)
	const [rows, setRows] = useState<soldProducts[]>([])														// Данные для строк в таблице, которые приходят с сервера
	const [loading, setLoading] = useState<boolean>(false)													// Состояние загрузки
	// const [complement, setComplement] = useState<{[vendorCode: string]: soldProducts[]}>({})							// Комплектующие, связанные с данными rows через vendorCode

	const abortController = useRef<AbortController | null>(null)												// Для прерывания запроса, если поступил новый запрос, а от предыдущего ответ ещё не получен


	/** Constants (functions) */
	/* Обновление данных , от которых зависит перерисовка таблицы */
	const updateTable = async (newPage: string): Promise<void> => {
		// Прерывание предыдущего запроса
		if (abortController.current)
			abortController.current.abort()

		abortController.current = new AbortController()

		// Установка состояния загрузки, чтобы пользователь видел, что идет запрос
		setLoading(true)
		// Отправка запроса на получание данных для таблицы, получение результата
		const result = await sendDataForProductTable(filter, parseInt(newPage), parseInt(size ?? '20'), sort ?? 'rating', outputList ?? 'fld', abortController.current)
		// Снятие состояния загрузки
		setLoading(false)

		// Если ответ пришел, установить состояние текущего запроса в null
		abortController.current = null
		// Установить новые значения переменных: строк таблицы (продукция), кол-во страниц, номер текущей страницы
		setRows(result.soldProducts)
		setLimit(result.availablePages)

		setValue('page', newPage)
	}


	/** UseEffects */
	/* Когда меняются выбранные данные в calculator
	или количество отображаемых строк в таблице,
	получить и обновить данные таблицы для первой страницы */
	useEffect(() => {
		updateTable('1')
	}, [filter, size, sort, outputList])

	/* Когда меняется номер страницы,
	получить и обновить данные таблицы для этой страницы */
	useEffect(() => {
		updateTable(page ?? '1')
	}, [page])


	/** Build DOM */
	return <>
		<TableSort setValue={setValue} outputList={outputList} sort={sort} size={size}/>

		{!rows?.length
			? <div className='not-found'>По вашему запросу ничего не найдено, измените данные
				поиска</div>
			: <TableSoldProd loading={loading} rows={rows} size={size} />
		}

		{
			// !loading &&
			limit > 1 ?
				<Pagination
					page={parseInt(page ?? '1')}
					limit={limit}
					onChangePage={page => setValue('page', page.toString())}
				/> : ''
		}
	</>
}

export default TableCalc
