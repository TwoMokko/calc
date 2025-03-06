import { TiThMenu } from "react-icons/ti";
import { FC } from "react";
import SelectCard from "../../../shared/ui/SelectCard.tsx";

interface TableProps {
	setValue: (key: string, value?: string) => void,
	outputList: string | undefined,
	sort: string | undefined,
	size: string | undefined
}

/* Русский текст для селекта сортировки (вынести куда-то?) */
const statesSort: { [key: string]: string } = {
	rating: 'по рейтингу',
	pressure: 'по давлению',
	stock: 'на складе'
}
/* Русский текст для селекта с комплектующими (вынести куда-то?) */
const statesOutputList: { [key: string]: string } = {
	fld: 'для продажи',
	withComplements: 'все'
}

const TableSort: FC<TableProps> = ({setValue, outputList, sort, size}) => {
	/** Constants (functions) */
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
	const prepareSetSort = (newValue: string): void => {
		for (const [key, value] of Object.entries(statesSort)) {
			if (value === newValue) setValue('sort', key)
		}
	}

	/* Обновление состояния сортировки по значению (рус) */
	const prepareSetOutputList = (newValue: string): void => {
		// console.log(newValue)
		for (const [key, value] of Object.entries(statesOutputList)) {
			if (value === newValue) setValue('outputList', key)
		}
	}

	/** Build DOM */
	return <div className='table-size'>
		<div className='table-size-head'>Результат</div>
		<div className='sort-wrap'>
			<SelectCard
				value={statesOutputList[outputList ?? 'fld']} option='outputList'
				values={Object.values(statesOutputList)}
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
};

export default TableSort;