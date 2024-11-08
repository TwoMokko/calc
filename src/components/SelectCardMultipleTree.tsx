import {useEffect, useRef, useState} from "react";
import {MdElectricBolt, MdKeyboardArrowDown} from "react-icons/md";
import {TreeDataNode, TreeDataNodeChild} from "../types/Types.tsx";
import {SelectCardMultipleTreeSubList} from "./SelectCardMultipleTreeSubList.tsx";
import {getTypeProducts} from "../api/Fetches.tsx";
import {isEqual, uniq} from "lodash";


export function SelectCardMultipleTree({onChange, highlight, valuesFilter}: {
	onChange: (types: string[]) => void,
	highlight?: string[],
	valuesFilter?: string[]
}): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null)
	const [showList, setShowList] = useState(false)
	const [checked, setChecked] = useState<string[]>([])
	const [checkedTitle, setCheckedTitle] = useState<TreeDataNodeChild[] | undefined>(undefined)
	const [values, setValues] = useState<TreeDataNode[]>()
	const [className, setClassName] = useState<string>('')

	useEffect(() => {
		(async () => {
			setValues(await getTypeProducts())
		})()
	}, [])

	useEffect(() => {
		setCheckedTitle(getCheckedTitle())
	}, [values]);

	useEffect(() => {
		const method = () => {
			if (inputRef.current != document.activeElement)
				setShowList(false)
		}

		document.addEventListener('click', method, false)
		return () => document.removeEventListener('click', method, false)
	}, []);

	// const focusInput = () => {
	// 	if (showList && inputRef.current)
	// 		inputRef.current.focus()
	// }

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

	useEffect(() => {
		if (!isEqual(valuesFilter ?? [], checked))
			setChecked(valuesFilter ?? [])
	}, [valuesFilter])

	useEffect(() => {
		checked.length ?
			((highlight?.length) ?
				(checked.some(itm => highlight.includes(itm)) ? setClassName('well') : setClassName('error'))
				: setClassName('selected-disable'))
			: ((highlight?.length) ? setClassName('well') : setClassName('disable'))
	}, [highlight, checked]);


	function changeChecked(key: string | string[], status?: boolean): void {
		let changes = uniq(status
			? [...checked, ...(typeof key == 'string' ? [key]: key)]
			: checked.filter(check => typeof key == 'string' ? check != key : !key.includes(check))
		)

		setChecked(changes)
		onChange(changes)
	}

	function onReset(): void {
		setChecked([])
		onChange([])
	}

	return <div
		className={`input-search character-type ${className}`}
		ref={inputRef}
		tabIndex={0}
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
				<div className='checked-list'>
					{
						checked.map(val => {
							return <div
								key={val}
								className={`checked-list-item ${highlight?.includes(val) ? '' : (checked.includes(val) ? 'error' : 'disable')}`}
								onClick={() => changeChecked(val, false)}
							>
								<div>{checkedTitle?.map(itm => {
									if (itm.key == val) return  itm.title
								})}</div>
								<div className='unchecked'></div>
							</div>
						})
					}
				</div>
				<div className='input-search-wrap-text'>
					{/*<input*/}
					{/*	ref={inputRef}*/}
					{/*/>*/}
				</div>
				<MdKeyboardArrowDown
					className={`${showList ? 'show' : ''}`}
				/>
			</div>
			{showList && <div className='input-search-list tree'>
				{
					values?.map(itm => {
						return <SelectCardMultipleTreeSubList
							key={itm.key}
							treeData={itm}
							// focusInput={focusInput}
							checked={checked}
							onChange={changeChecked}
							highlight={highlight}
						/>
					})
				}
            </div>}
		</div>
	</div>
}