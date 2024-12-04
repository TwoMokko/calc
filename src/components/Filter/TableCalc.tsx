import { FC, useEffect, useRef, useState } from "react";
import { sendData, soldProducts } from "../../types/Types.tsx";
import { sendDataForProductTable } from "../../api/Fetches.tsx";
import { Pagination } from "../Pagination.tsx";
import { TiThMenu } from "react-icons/ti";
import { SelectCard } from "../SelectCard.tsx";
import useSearchController from "../../hooks/useSearchController.tsx";

interface TableCalcProps {
	filter: sendData,
	defaultSize?: number,
	defaultPage?: number
}

const states: { [key: string]: string } = {
	rating: 'по рейтингу',
	pressure: 'по давлению'
}

export const TableCalc: FC<TableCalcProps> = ({filter}): JSX.Element => {
	/** Constants */
	const {urls: {page, sort, size}, setValue} =  useSearchController()
	const [limit, setLimit] = useState<number>(1)											// Номер последней страницы (кол-во страниц)
	const [rows, setRows] = useState<soldProducts[]>([])									// Данные для строк в таблице, которые приходят с сервера
	const [loading, setLoading] = useState<boolean>(false)								// Состояние загрузки

	const abortController = useRef<AbortController | null>(null)							// Для прерывания запроса, если поступил новый запрос, а от предыдущего ответ ещё не получен


	/** Constants (functions) */
	/* Обновление данных , от которых зависит перерисовка таблицы */
	const updateTable = async (page: string): Promise<void> => {
		// Прерывание предыдущего запроса
		if (abortController.current)
			abortController.current.abort()

		abortController.current = new AbortController()

		// Установка состояния загрузки, чтобы пользователь видел, что идет запрос
		setLoading(true)
		// Отправка запроса на получание данных для таблицы, получение результата
		const result = await sendDataForProductTable(filter, parseInt(page), parseInt(size ?? '20'), sort ?? 'rating', abortController.current)
		// Снятие состояния загрузки
		setLoading(false)

		// Если ответ пришел, установить состояние текущего запроса в null
		abortController.current = null
		// Установить новые значения переменных: строк таблицы (продукция), кол-во страниц, номер текущей страницы
		setRows(result.soldProducts)
		setLimit(result.availablePages)
		setValue('page', page)
	}

	/* Проверка того, что ввёл пользователь
	(размер должен быть не меньше 5 и не больше 100)
	и после этого установка нвоого значения size */
	const validateSize = (val: string) => {
		let size = parseInt(val ? val : '0')
		if (size < 5)
			size = 5

		if (size > 50)
			size = 50

		setValue('size', size.toString())
	}

	/* Обновление состояния сортировки по значению (рус) */
	const prepareSetSort = (newValue:  string): void => {
		for (const [key, value] of Object.entries(states)) {
			if (value === newValue) setValue('sort', key)
		}
	}


	/** UseEffects */
	/* Когда меняются выбранные данные в filter
	или количество отображаемых строк в таблице,
	получить и обновить данные таблицы для первой страницы */
	useEffect(() => {
		updateTable('1')
	}, [filter, size, sort])

	/* Когда меняется номер страницы,
	получить и обновить данные таблицы для этой страницы */
	useEffect(() => {
		updateTable(page ?? '1')
	}, [page])


	/** Build DOM */
	/* Проверка, пришли ли данные для отрисовки DOM  */
	if (!rows?.length) return <div className='not-found'>По вашему запросу ничего не найдено, измените данные
		поиска</div>

	/* Отрисовка DOM */
	return <>
		<div className='table-size'>
			<div className='table-size-head'>Результат</div>

			<div className='sort-state-wrap'>
				<SelectCard value={states[sort ?? 'rating']} option='sort' values={Object.values(states)} onChange={prepareSetSort} highlight={Object.values(states)} not={{
					color: true,
					search: true,
					reset: true
				}} />
			</div>

			{/* TODO вынести куда-то отдельно */}
			<div>
				<h4>Количество строк</h4>
				<div className='table-size-input'>
					<TiThMenu
						width='20px'
						height='20px'
					/>
					<input
						type='number'
						className='page-size-input'
						defaultValue={size}
						onBlur={(event) => {
							validateSize(event.currentTarget.value)
						}}
					/>
				</div>
			</div>
		</div>

		<table className={`table ${loading ? 'table-loading-text' : ''}`}>
			{loading && <div className='table-loading'></div>}
			<thead>
			<tr>
				<th>Артикул</th>
				<th>На складе</th>
				<th>Давление</th>
				<th>Мин температура</th>
				<th>Макс температура</th>
				<th>Рейтинг типа</th>
				<th>Рейтинг самого товара</th>
				<th>Количество заказов</th>
				<th>Количество купленных</th>
				<th>Цена</th>
			</tr>
			</thead>
			<tbody>
			{rows.slice(0, parseInt(size ?? '20')).map((itm: soldProducts, id: number) => {
				return <tr key={id}>
					<td>
						<a
							target='_blank'
							href={`/prod/${itm.vendorCode}`}
						>
							{itm.vendorCode}
						</a>
					</td>
					<td>{itm.quantityInStock}</td>
					<td>{itm.workingPressure}</td>
					<td>{itm.minTemperature}</td>
					<td>{itm.maxTemperature}</td>
					<td>{itm.typeRating}</td>
					<td>{itm.rating}</td>
					<td>{itm.numberOfOrders}</td>
					<td>{itm.purchasedQuantity}</td>
					<td>{itm.price}</td>
				</tr>
			})}
			</tbody>
		</table>

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