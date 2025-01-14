import React, {FC, Fragment, ReactNode, useEffect, useRef, useState} from "react";
import { sendData, soldProducts } from "../../../app/types/types.ts";
import { Pagination } from "../../../shared/ui/Pagination.tsx";
import { TiThMenu } from "react-icons/ti";
import { SelectCard } from "../../../shared/ui/SelectCard.tsx";
import useSearchController from "../../../shared/hooks/useSearchController.tsx";
import { Button } from "../../../shared/ui/Button.tsx";
import { sendDataForProductTable } from "../api/fetches.ts";
import { IoImage } from "react-icons/io5";
import { TableHover } from "./TableHover.tsx";

interface TableCalcProps {
	filter: sendData,
	defaultSize?: number,
	defaultPage?: number
}

/* Русский текст для селекта сортировки (вынести куда-то?) */
const statesSort: { [key: string]: string } = {
	rating: 'по рейтингу',
	pressure: 'по давлению'
}
/* Русский текст для селекта с комплектующими (вынести куда-то?) */
const statesOutputList: { [key: string]: string } = {
	fld: 'для продажи',
	withComplements: 'все'
}


export const TableCalc: FC<TableCalcProps> = ({filter}): ReactNode => {
	/** Constants */
	const {urls: {page, sort, size, outputList}, setValue} =  useSearchController()
	const [limit, setLimit] = useState<number>(1)													// Номер последней страницы (кол-во страниц)
	const [rows, setRows] = useState<soldProducts[]>([])											// Данные для строк в таблице, которые приходят с сервера
	const [loading, setLoading] = useState<boolean>(false)										// Состояние загрузки
	// const [complement, setComplement] = useState<{[vendorCode: string]: soldProducts[]}>({})		// Комплектующие, связанные с данными rows через vendorCode
	const [showComplement, setShowComplement] = useState<string[]>([])							// Показываются только определенные комплектующие (чей vendorCode есть в массиве showComplement)

	const abortController = useRef<AbortController | null>(null)									// Для прерывания запроса, если поступил новый запрос, а от предыдущего ответ ещё не получен


	const [isHover, setIsHover] = useState(false)
	const [coordinateHover, setCoordinateHover] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
	const trigger = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!isHover) return
		setCoordinateHover({ x: event.pageX + 10, y: event.pageY + 10 })
	}

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
		for (const [key, value] of Object.entries(statesSort)) {
			if (value === newValue) setValue('sort', key)
		}
	}

	/* Обновление состояния сортировки по значению (рус) */
	const prepareSetOutputList = (newValue:  string): void => {
		// console.log(newValue)
		for (const [key, value] of Object.entries(statesOutputList)) {
			if (value === newValue) setValue('outputList', key)
		}
	}

	/* Изменение отображения комплектующих при нажатии на кнопку (показать, скрыть),
	либо добавляется vendorCode в массив, либо удаляется из массива */
	const redrawComplement = (vendorCode: string) => {
		// if (!(vendorCode in complement)) setComplement({})

		const temp = showComplement.filter(itm => itm != vendorCode)

		if (!showComplement.includes(vendorCode)) temp.push(vendorCode)
		setShowComplement(temp)
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
	/* Проверка, пришли ли данные для отрисовки DOM  */
	if (!rows?.length) return <div className='not-found'>По вашему запросу ничего не найдено, измените данные
		поиска</div>

	/* Отрисовка DOM */
	return <>
		<div className='table-size'>
			<div className='table-size-head'>Результат</div>

			<div className='sort-wrap'>
				<SelectCard
					value={statesOutputList[outputList ?? 'fld']} option='outputList' values={Object.values(statesOutputList)}
					onChange={prepareSetOutputList} highlight={Object.values(statesOutputList)} not={{
					color: true,
					search: true,
					reset: true
				}}
				/>
				<SelectCard
					value={statesSort[sort ?? 'rating']} option='sort' values={Object.values(statesSort)}
					onChange={prepareSetSort} highlight={Object.values(statesSort)} not={{
					color: true,
					search: true,
					reset: true
				}}
				/>
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

		<div className='table-wrap'>
			<table className={`table ${loading ? 'table-loading-text' : ''}`}>
				{loading && <div className='table-loading'></div>}
				<thead>
				<tr>
					<th>Артикул</th>
					<th>На складе</th>
					<th>Общее кол-во</th>
					<th>Подсоединения</th>
					<th>Конфигурация</th>
					<th>Давление</th>
					<th>Мин темп</th>
					<th>Макс темп</th>
					<th>Cv</th>
					<th>Dn</th>
					<th>Цена</th>
				</tr>
				</thead>
				<tbody>
				{rows.slice(0, parseInt(size ?? '20')).map((itm: soldProducts, id: number) => {
					return <Fragment key={id}>
						<tr>
							<td className='vendor-code'>
								<a
									target='_blank'
									href={`/prod/${itm.vendorCode}`}
								>
									{itm.vendorCode}
								</a>
								{
									itm.types?.length && <Button
                                        title='' onClick={() => redrawComplement(itm.vendorCode)}
                                        className={`show-complement ${showComplement.includes(itm.vendorCode) ? '' : 'plus'} btn-secondary`}
                                        icon={<></>}
                                    />
								}
							</td>
							<td>{itm.quantityInStock}</td>
							<td>{itm.totalQuantity}</td>
							<td>{itm.connectionInfo}</td>
							<td>
								<div
									className='table-configuration'
									onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => trigger(event)}
									onMouseEnter={() => setIsHover(true)}
									onMouseLeave={() => setIsHover(false)}
								>
									<IoImage />
									text
								</div>
							</td>
							<td>{itm.workingPressure}</td>
							<td>{itm.minTemperature}</td>
							<td>{itm.maxTemperature}</td>
							<td>{itm.cv}</td>
							<td>{itm.dn}</td>
							<td>{itm.price?.toFixed(2)}</td>
						</tr>
						{
							(itm.types && showComplement.includes(itm.vendorCode)) && itm.types.map(trComplement =>
								<tr className='complement'>
									<td>
										{trComplement.vendorCode}
										{/*<a*/}
										{/*	target='_blank'*/}
										{/*	href={`/prod/${trComplement.vendorCode}`}*/}
										{/*>*/}
										{/*	{trComplement.vendorCode}*/}
										{/*</a>*/}
									</td>
									<td>{trComplement.quantityInStock}</td>
									<td></td>
									<td>{itm.connectionInfo}</td>
									<td>{itm.configuration}</td>
									<td>{itm.workingPressure}</td>
									<td>{itm.minTemperature}</td>
									<td>{itm.maxTemperature}</td>
									<td>{itm.cv}</td>
									<td>{itm.dn}</td>
									<td>{itm.price?.toFixed(2)}</td>
								</tr>)
						}
					</Fragment>
				})}
				</tbody>
			</table>

			<TableHover isHover={isHover} coordinateHover={coordinateHover} />
		</div>

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