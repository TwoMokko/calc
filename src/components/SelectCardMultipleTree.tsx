import {useEffect, useRef, useState} from "react";
// import {isEqual} from "lodash";
import {MdElectricBolt, MdKeyboardArrowDown} from "react-icons/md";
import {TreeDataNode, TreeDataNodeChild, TreeDataNodes} from "../types/Types.tsx";
import {SelectCardMultipleTreeSubList} from "./SelectCardMultipleTreeSubList.tsx";
// import {getTypeProducts} from "../api/Fetches.tsx";


const treeData: TreeDataNodes = [
	{
		title: 'parent 1',
		key: 'parent 1',
		children: [
			{
				title: 'child 1',
				key: 'child 1.1',
			},
			{
				title: 'child 2',
				key: 'child 1.2',
			},
			{
				title: 'child 3',
				key: 'child 1.3',
			},
		],
	},
	{
		title: 'parent 2',
		key: 'parent 2',
		children: [
			{ title: 'child 1', key: 'child 2.1' },
			{ title: 'child 2', key: 'child 2.2' },
			{ title: 'child 3', key: 'child 2.3' },
		],
	},
	{
		title: 'parent 3',
		key: 'parent 3',
	},
]

export function SelectCardMultipleTree({onChange, highlight}: {
	onChange: (types: string[]) => void,
	highlight?: string[]
}): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null)
	const [showList, setShowList] = useState(false)
	const [checked, setChecked] = useState<string[]>([])
	const [values, setValues] = useState<TreeDataNode[]>()
	// const [className, setClassName] = useState<string>('')

	useEffect(() => {
		// (async () => {
		// 	setCurrentValues(await getTypeProducts())
		// })()

		setValues(treeData)
	}, [])

	useEffect(() => {

	}, [highlight]);

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

	function contains(where: string[], what: string[]){
		for(let i=0; i<what.length; i++){
			if(where.indexOf(what[i]) == -1) return false;
		}
		return true;
	}
	function onClick(targetItm: TreeDataNodeChild, status?: boolean, parentKey?: string): void {
		let changes = checked

		status ? changes.push(targetItm.key) : changes = changes.filter(check => check != targetItm.key)

		if (!parentKey) {
			values?.map(itm => {
				itm.key === targetItm.key && itm.children?.map(subitm => {
					status ? changes.push(subitm.key) : changes = changes.filter(check => check != subitm.key)
				})
			})
		}

		if (parentKey) {
			values?.map(itm => {
				if (itm.key == parentKey) {
					let childsChecked: string[] = []
					itm.children?.map(child => {
						changes.includes(child.key) &&
							status ? childsChecked.push(child.key) : childsChecked = childsChecked.filter(check => check != child.key)
					})
					childsChecked.length == itm.children?.length && contains(changes, childsChecked) ? changes.push(parentKey) : changes = changes.filter(check => check != parentKey)
				}
			})
		}

		console.log({changes})
		setChecked(changes)
		onChange(changes)
	}

	function onReset(): void {
		setChecked([])
		onChange([])
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
					values?.map(itm => {
						return <SelectCardMultipleTreeSubList treeData={itm} focusInput={focusInput} checked={checked} onChange={onClick} />
					})
				}
            </div>}
		</div>
	</div>
}