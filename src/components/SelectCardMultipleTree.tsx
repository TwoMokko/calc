import { FC, useEffect, useRef, useState } from "react";
import { MdElectricBolt, MdKeyboardArrowDown } from "react-icons/md";
import { TreeDataNode, TreeDataNodeChild } from "../types/Types.tsx";
import { SelectCardMultipleTreeSubList } from "./SelectCardMultipleTreeSubList.tsx";
import { getTypeProducts } from "../api/Fetches.tsx";
import { isEqual, uniq } from "lodash";
import { useDebouncedCallback } from "use-debounce";

// TODO: одинаковые методы, вынести куда-то?

const titles = new Map<string, string>()				// TODO: дописать

interface SelectCardMultipleTreeProps {
	onChange: (types: string[]) => void,
	highlight?: string[],
	valuesFilter?: string[]
}

export const SelectCardMultipleTree: FC<SelectCardMultipleTreeProps> = ({onChange, highlight, valuesFilter}): JSX.Element => {
	/** Constants */
	const inputRef = useRef<HTMLInputElement>(null)											// TODO: дописать
	const [showList, setShowList] = useState(false)											// TODO: дописать
	const [checked, setChecked] = useState<string[]>([])										// TODO: дописать
	const [values, setValues] = useState<TreeDataNode[]>()												// TODO: дописать
	const [className, setClassName] = useState<string>('')									// TODO: дописать
	const [inputValue, setInputValue] = useState<string>('')									// TODO: дописать
	// const [checkedTitle, setCheckedTitle] = useState<TreeDataNodeChild[] | undefined>(undefined)

	// const [checkedList, setCheckedList] = useState<TreeDataNodeChild>()

	/** Constants (functions) */
	/* TODO: дописать */
	const focusInput = () => {
		if (showList && inputRef.current)
			inputRef.current.focus()
	}

	/* Записать все ключи/значения (родителей и детей)
	в один массив с объектами ключ/значение и вернуть этот массив
	Нужно, чтобы потом по этому массиву было удобнее бежать */
	const getCheckedTitle = (): TreeDataNodeChild[] => {
		let list: TreeDataNodeChild[] = []
		values?.map(itm => {
			list.push({key: itm.key, title: itm.title})
			itm.childs && itm.childs.map(subitm => {
				list.push({key: subitm.key, title: subitm.title})
			})
		})

		return list
	}

	/*  */
	const changeChecked = (key: string | string[], status?: boolean): void => {
		let changes = uniq(status
			? [...checked, ...(typeof key == 'string' ? [key]: key)]
			: checked.filter(check => typeof key == 'string' ? check != key : !key.includes(check))
		)

		setChecked(changes)
		onChange(changes)
	}

	/* Посласть запрос на получение новых данных дерева через указанное кол-во миллисекунд бездействия */
	const debounceOnInput = useDebouncedCallback(
		async () => {
			setValues(await getTypeProducts(inputValue))
		},
		500
	)

	/* Сбросить значения для выбранных значений (checkbox) и в основных данных через callback */
	const onReset = (): void => {
		setChecked([])
		onChange([])
	}


	/** UseEffects */
	/* При инициализации компонента отправить запрос и получить дерево данных, записать в состояние values */
	useEffect(() => {
		(async () => {
			setValues(await getTypeProducts(inputValue))
		})()
	}, [])

	/* При инициализации компонента TODO: дописать */
	useEffect(() => {
		const method = () => {
			if (inputRef.current != document.activeElement)
				setShowList(false)
		}

		document.addEventListener('click', method, false)
		return () => document.removeEventListener('click', method, false)
	}, []);

	/* При изменении данных всего дерева TODO: дописать */
	useEffect(() => {
		// setCheckedTitle(getCheckedTitle())

		getCheckedTitle().map(itm => {
			if (itm.title)
				titles.set(itm.key, itm.title)
		})
	}, [values]);

	/* При изменении состояние видимости списка с деревом, вызвать фокус на инпуте */
	useEffect(focusInput, [showList]);

	/* При изменении данных извне, проверить отличаются ли эти данные от текущих в компоненте, если да, то обновить */
	useEffect(() => {
		if (!isEqual(valuesFilter ?? [], checked))
			setChecked(valuesFilter ?? [])
	}, [valuesFilter])


	/* При изменении списка совместимых параметров или списка выбранных изменить покраску */
	useEffect(() => {
		checked.length ?
			((highlight?.length) ?
				(checked.some(itm => highlight.includes(itm)) ? setClassName('well') : setClassName('error'))
				: setClassName('selected-disable'))
			: ((highlight?.length) ? setClassName('well') : setClassName('disable'))
	}, [highlight, checked]);


	/** Build DOM */
	return <div
		className={`input-search character-type ${className}`}
		// ref={inputRef}
		// tabIndex={0}
		// className={`input-search character-type`}
	>
		<div className='input-search-head'>
			<h4>Тип продукции</h4>
			{
				(checked.length > 0) && <div
                    onClick={onReset}
                    className='reset-option'
                    title={'сбросить: Тип продукции'}
                >
                </div>
			}
		</div>
		<div className='input-search-wrap'>
			<div className='input-search-wrap-top'
				 onClick={() => setShowList(true)}
			>
				<MdElectricBolt/>
				<div className='input-search-wrap-text-wrap'>
					<div className='checked-list'>
						{
							checked.map(val => {
								return <div
									key={val}
									className={`checked-list-item ${highlight?.includes(val) ? '' : (checked.includes(val) ? 'error' : 'disable')}`}
									onClick={() => changeChecked(val, false)}
								>
									{/*<div>{checkedTitle?.map(itm => {*/}
									{/*	if (itm.key == val) return itm.title*/}
									{/*})}</div>*/}
									<div>
										{titles.get(val)}
									</div>
									<div className='unchecked'></div>
								</div>
							})
						}
					</div>
					<div className='input-search-wrap-text'>
						<input
							ref={inputRef}
							onChange={event => setInputValue(event.currentTarget.value)}
							onInput={debounceOnInput}
							value={inputValue}
						/>
					</div>
				</div>
				<MdKeyboardArrowDown className={`${showList ? 'show' : ''}`} />
			</div>
			{
				showList && <div className='input-search-list tree'>
					{
						values?.map(itm => {
							return <SelectCardMultipleTreeSubList
								key={itm.key}
								treeData={itm}
								focusInput={focusInput}
								checked={checked}
								onChange={changeChecked}
								highlight={highlight}
							/>
						})
					}
				</div>
			}
		</div>
	</div>
}