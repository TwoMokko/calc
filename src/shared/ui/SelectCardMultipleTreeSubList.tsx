import { FC, ReactNode, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TreeDataNode } from "../../features/calculator/model/types.ts";

const arrayInclude = (array1: string[], array2: string[]) => {
	return array1.length ? array1.filter(itm => array2.includes(itm)).length == array1.length : false
}

interface SelectCardMultipleTreeSubListProps {
	onChange: (key: string | string[], status?: boolean, parentKey?: string) => void,
	highlight?: string[],
	treeData: TreeDataNode,
	focusInput?: () => void,
	checked: string[],
}

const SelectCardMultipleTreeSubList: FC<SelectCardMultipleTreeSubListProps> = ({onChange, highlight, treeData, focusInput, checked}): ReactNode => {
	/** Constants */
	const [showSubList, setShowSubList] = useState(false)							// Состояние видимости внутреннего списка (детей)


	/** UseEffects */
	/* При изменении совместимых параметров, показать внутренний список, в котором присутствуют совместимиые параметры */
	useEffect(() => {
		treeData.childs?.map(itm => {
			if (showSubList) return
			highlight?.includes(itm.key) && setShowSubList(true)
		})
	}, [highlight]);


	/** Build DOM */
	return <>
		<div
			// className='tree'
			// className={`tree ${className}`}
			// className={`tree ${highlight?.includes(treeData.key) ? 'well' : (checked.includes(treeData.key) ? 'error' : 'disable')}`}
			className={`tree ${highlight?.includes(treeData.key) ? 'well' : ''}`}
			onClick={focusInput}
		>
			<MdKeyboardArrowDown
				className={`tree-show ${showSubList ? 'show' : ''}`}
				onClick={() => setShowSubList(!showSubList)}
			/>
			<label
				// className={`input-search-list-item ${highlight?.includes(treeData.key) ? 'well' : (checked.includes(treeData.key) ? 'error' : 'disable')}`}
				className={`input-search-list-item`}
				key={treeData.key}
			>
				<input
					className='hide'
					type='checkbox'
					value={treeData.title}
					checked={!treeData.childs ? checked.includes(treeData.key) : arrayInclude(treeData.childs.map(itm => itm.key), checked)}
					onChange={
						(event) => onChange(!treeData.childs ? treeData.key : treeData.childs?.map(itm => itm.key), event.currentTarget.checked)
					}
				/>
				<div className='check'>
					{treeData.title}
				</div>
			</label>
		</div>

		{
			showSubList &&
			treeData.childs?.map(subitem => {
				return <label
					className={`input-search-list-item subitem ${highlight?.includes(subitem.key) ? 'well' : (checked.includes(subitem.key) ? 'error' : 'disable')}`}
					key={subitem.key}
					onClick={focusInput}
				>
					<input
						className='hide'
						type='checkbox'
						value={subitem.title}
						checked={checked.includes(subitem.key)}
						onChange={
							(event) => onChange(subitem.key, event.currentTarget.checked)
						}
					/>
					<div className='check'>
						{subitem.title}
					</div>
				</label>
			})
		}
	</>
}

export default SelectCardMultipleTreeSubList