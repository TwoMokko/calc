import {useEffect, useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
import {TreeDataNode, TreeDataNodeChild} from "../types/Types.tsx";

export function SelectCardMultipleTreeSubList({onChange, highlight, treeData, focusInput, checked}: {
	onChange: (targetItm: TreeDataNodeChild, status?: boolean, parentKey?: string) => void,
	highlight?: string[],
	treeData: TreeDataNode,
	focusInput: () => void,
	checked: string[]
}): JSX.Element {
	const [showSubList, setShowSubList] = useState(false)
	// const [checked, setChecked] = useState<string[]>([])
	// const [values, setValues] = useState<TreeDataNodeChild>()
	// const [className, setClassName] = useState<string>('')

	// useEffect(() => {
	// 	setValues(treeData)
	// }, [])

	useEffect(() => {

	}, [highlight]);

	function changeShowSubList(): void {
		console.log('')
		setShowSubList(!showSubList)
	}

	return <>
		<div
			className='tree'
			onClick={focusInput}
		>
			<MdKeyboardArrowDown
				className={`tree-show ${showSubList ? 'show' : ''}`}
				onClick={() => changeShowSubList()}
			/>
			<label
				// TODO: проверить className
				// className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (checked.includes(val) ? 'error' : 'disable')}`}
				className={`input-search-list-item`}
				key={treeData.key}
			>
				<input
					className='hide'
					type='checkbox'
					value={treeData.title}
					checked={checked.includes(treeData.key)}
					onChange={
						(event) => onChange(treeData, event.currentTarget.checked)
					}
				/>
				<div className='check'>
					{treeData.title}
					{/*{!inputValue*/}
					{/*	? itm.title*/}
					{/*	: <span*/}
					{/*		dangerouslySetInnerHTML={{__html: itm.title.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>*/}
					{/*}*/}
				</div>
			</label>
		</div>

		{
			showSubList &&
			treeData.children?.map(subitem => {
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
							(event) => onChange(subitem, event.currentTarget.checked, treeData.key)
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
}