import { FC, ReactNode, useEffect } from "react";

interface TableHoverProps {
	isHover: boolean,
	coordinateHover?: { x: number, y: number },
	imagePath?: string
}

const TableHover: FC<TableHoverProps> = ({isHover, coordinateHover, imagePath}): ReactNode => {
	/* Этот компонент нужен для отображения картинки при наведении на конфигурацию в результирующей таблице */

	/** Constants */
	// Надо придумать, как установить координаты раньше, чем изменить дисплей (тут или в TableCalc.trigger)
	const style = coordinateHover && isHover ? {
		left: coordinateHover.x,
		top: coordinateHover.y,
		display: 'inline-block'
	} : {
		display: 'none',
	}

	/** UseEffects */
	useEffect(() => {
		if (!isHover) {
			return
		}
	}, [isHover]);

	/** Build DOM */
	return <div
		className='table-configuration-img'
		style={style}
	>
		<img alt='img' src={imagePath ?? ''}/>
	</div>
}

export default TableHover
