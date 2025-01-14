import {FC, ReactNode, useEffect } from "react";

interface TableHoverProps {
	isHover: boolean,
	coordinateHover: { x: number, y: number }
}

export const TableHover: FC<TableHoverProps> = ({isHover, coordinateHover}): ReactNode => {

	const style = {
		display: isHover
		? 'inline-block'
		: 'none',
		left: coordinateHover.x,
		top: coordinateHover.y
	};

	useEffect(() => {
		if (!isHover) {
			return
		}

	}, [isHover]);

	return <div
		className='table-configuration-img'
		style={style}
	>
		<img alt='img' src='https://fld.ru/images/products/h-zur-4-2.jpg'/>
	</div>
}
