import { FC, ReactNode, useEffect } from "react";

interface TableHoverProps {
	isHover: boolean,
	coordinateHover?: { x: number, y: number },
	imagePath?: string
}

export const TableHover: FC<TableHoverProps> = ({isHover, coordinateHover, imagePath}): ReactNode => {

	// Надо придумать, как установить координаты раньше, чем изменить дисплей (тут или в TableCalc.trigger)
	const style = coordinateHover && isHover ? {
		left: coordinateHover.x,
		top: coordinateHover.y,
		display: 'inline-block'
	} : {
		display: 'none',
	}

	useEffect(() => {
		if (!isHover) {
			return
		}
	}, [isHover]);

	return <div
		className='table-configuration-img'
		style={style}
	>
		<img alt='img' src={imagePath ?? ''}/>
	</div>
}
