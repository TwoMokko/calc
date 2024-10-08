import {useEffect, useRef, useState} from "react";
// import {isEqual} from "lodash";
import {MdElectricBolt, MdKeyboardArrowDown} from "react-icons/md";
import {TreeDataNode, TreeDataNodeChild} from "../types/Types.tsx";



export function SelectCardMultipleTree({/*title, value,*/ values, /*onChange, highlight*/}: {
	// title: string,
	// value?: string[],
	// values: string[],
	// highlight?: string[]
	values: TreeDataNode[],
	onChange: (types: TreeDataNode[]) => void,
	highlight?: TreeDataNode[]
}): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null)
	const [showList, setShowList] = useState(false)
	const [checked, setChecked] = useState<string[]>([])
	// const [inputValue, setInputValue] = useState<string>('')
	const [currentValues, /*setCurrentValues*/] = useState<TreeDataNode[]>(values)

	// const [className, setClassName] = useState<string>('')

	useEffect(() => {
		const method = () => {
			if (inputRef.current != document.activeElement)
				setShowList(false)
		}

		document.addEventListener('click', method, false)
		return () => document.removeEventListener('click', method, false)
	}, []);

	const focusInput = () => {
		if (showList && inputRef.current)
			inputRef.current.focus()
	}

	useEffect(focusInput, [showList]);

	// useEffect(() => {
	// 	checked.length ?
	// 		((highlight?.length) ?
	// 			(checked.some(itm => highlight.includes(itm)) ? setClassName('well') : setClassName('error'))
	// 			: setClassName('selected-disable'))
	// 		: ((highlight?.length) ? setClassName('well') : setClassName('disable'))
	// }, [highlight, checked]);
	//
	// useEffect(() => {
	// 	if (!isEqual(value ?? [], checked))
	// 		setChecked(value ?? [])
	// }, [value])
	//
	// useEffect(() => {
	// 	setCurrentValues(prev => {
	// 		return [
	// 			...prev.sort((a, b) => {
	//
	// 				const aIn = highlight?.includes(a)
	// 				const bIn = highlight?.includes(b)
	//
	// 				if (inputValue) {
	// 					let aSearch = a.search(inputValue.toUpperCase()) != -1
	// 					let bSearch = b.search(inputValue.toUpperCase()) != -1
	//
	// 					if (aSearch && !bSearch)
	// 						return -1
	// 					else if (bSearch && !aSearch)
	// 						return +1;
	//
	// 					return 0
	// 				} else {
	//
	// 					if (aIn && !bIn)
	// 						return -1
	// 					else if (bIn && !aIn)
	// 						return +1;
	//
	// 					return 0
	// 				}
	// 			})
	// 		]
	// 	})
	// }, [highlight, inputValue])
	//
	// function onClick(value: string, status?: boolean) {
	// 	if (!value) {
	// 		setChecked([])
	// 		onChange([])
	// 		return
	// 	}
	//
	// 	const changes = !status
	// 		? checked.filter(itm => itm != value)
	// 		: [...checked, value]
	// 	setChecked(changes)
	// 	onChange(changes)
	// }

	function onClick(targetItm: TreeDataNodeChild, status?: boolean, parentKey?: string): void {
		let changes = checked

		status ? changes.push(targetItm.key) : changes = changes.filter(check => check != targetItm.key)

		if (!parentKey) {
			values.map(itm => {
				itm.key === targetItm.key && itm.children?.map(subitm => {
					status ? changes.push(subitm.key) : changes = changes.filter(check => check != subitm.key)
				})
			})

			// status ? changes.push(targetItm.key) : changes = changes.filter(check => check != targetItm.key)
		}

		if (parentKey) {
			// проверить, если все дети parentKey входят в changes, то parentKey тоже запушить в changes
			let count = 0
			values.map(itm => {
				if (itm.key == parentKey) {
					itm.children?.map(child => {
						!changes.includes(child.key) ? console.log('return') : (status ? count++ : count--)
					})
					console.log(count)
					console.log(itm.children?.length)
				}

			})

			// status ? changes.push(targetItm.key) : changes = changes.filter(check => check != targetItm.key)
		}

		setChecked(changes)

		// if (!value) {
		// 	setChecked([])
		// 	onChange([])
		// 	return
		// }
		//
		// const changes = !status
		// 	? checked.filter(itm => itm != value)
		// 	: [...checked, value]
		// setChecked(changes)
		// onChange(changes)
	}

	function onReset(): void {
		setChecked([])
		// 	onChange([])
	}

	return <div
		// className={`input-search ${className}`}
		className={`input-search`}
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
				{/*<div className='checked-list'>*/}
				{/*	{*/}
				{/*		checked.map(val => {*/}
				{/*			return <div*/}
				{/*				key={val}*/}
				{/*				// TODO: проверить className*/}
				{/*				className={`checked-list-item ${highlight?.includes(val) ? '' : (checked.includes(val) ? 'error' : 'disable')}`}*/}
				{/*				onClick={() => onClick(val, false)}*/}
				{/*			>*/}
				{/*				<div>{val}</div>*/}
				{/*				<div*/}
				{/*					className='unchecked'*/}
				{/*				></div>*/}
				{/*			</div>*/}
				{/*		})*/}
				{/*	}*/}
				{/*</div>*/}
				<div className='input-search-wrap-text'>
					<input
						ref={inputRef}
						// onChange={event => setInputValue(event.currentTarget.value)}
						// value={inputValue}
					/>
				</div>
				<MdKeyboardArrowDown
					className={`${showList ? 'show' : ''}`}
				/>
			</div>
			{showList && <div className='input-search-list'>
				{
					currentValues.map(itm => {
						return <>
							<label
								// TODO: проверить className
								// className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (checked.includes(val) ? 'error' : 'disable')}`}
								className={`input-search-list-item`}
								key={itm.key}
								onClick={focusInput}
							>
								<input
									className='hide'
									type='checkbox'
									value={itm.title}
									checked={checked.includes(itm.key)}
									onChange={
										// (event) => onClick(val, event.currentTarget.checked)
										(event) => onClick(itm, event.currentTarget.checked)
									}
								/>
								<div className='check'>
									{itm.title}
									{/*{!inputValue*/}
									{/*	? itm.title*/}
									{/*	: <span*/}
									{/*		dangerouslySetInnerHTML={{__html: itm.title.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>*/}
									{/*}*/}
								</div>
							</label>

							{
								itm.children?.map(subitem => {
									return <label
										// TODO: проверить className
										// className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (checked.includes(val) ? 'error' : 'disable')}`}
										className={`input-search-list-item subitem`}
										key={subitem.key}
										onClick={focusInput}
									>
										<input
											className='hide'
											type='checkbox'
											value={subitem.title}
											checked={checked.includes(subitem.key)}
											onChange={
												(event) => onClick(subitem, event.currentTarget.checked, itm.key)
											}
										/>
										<div className='check'>
											{subitem.title}
											{/*{!inputValue*/}
											{/*	? subitem.title*/}
											{/*	: <span*/}
											{/*		dangerouslySetInnerHTML={{__html: subitem.title.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>*/}
											{/*}*/}
										</div>
									</label>
								})
							}
						</>

					})
				}
            </div>}
		</div>
	</div>
}