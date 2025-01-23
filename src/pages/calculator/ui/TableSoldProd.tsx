import { soldProducts } from "../config/types.ts";
import React, {FC, Fragment, useState} from "react";
import { Button } from "../../../shared/ui/Button.tsx";
import { IoImage } from "react-icons/io5";
import { TableHover } from "./TableHover.tsx";

interface TableSortProps {
	loading: boolean,
	rows: soldProducts[],
	size: string | undefined
}

const TableSoldProd: FC<TableSortProps> = ({loading, rows, size}) => {
	/** Constants */
	const [showComplement, setShowComplement] = useState<string[]>([])										// Показываются только определенные комплектующие (чей vendorCode есть в массиве showComplement)
	const [isHover, setIsHover] = useState(false)																// Состояние, находимся ли мы на элементе, чтобы показывать картинку
	const [imagePath, setImagePath] = useState<string | undefined>()													// Состояние, находимся ли мы на элементе, чтобы показывать картинку
	const [coordinateHover, setCoordinateHover] = useState<{ x: number, y: number } | undefined>()						// Координаты для отображения изображения (style.position: top и left)
	const positionHoverImage = 10																						// Количество пикселей, на которое картинка отодвинута от курсора мыши


	/** Constants (functions) */
	/* Изменение отображения комплектующих при нажатии на кнопку (показать, скрыть),
	либо добавляется vendorCode в массив, либо удаляется из массива */
	const redrawComplement = (vendorCode: string) => {
		// if (!(vendorCode in complement)) setComplement({})

		const temp = showComplement.filter(itm => itm != vendorCode)

		if (!showComplement.includes(vendorCode)) temp.push(vendorCode)
		setShowComplement(temp)
	}

	/* Когда курсор переходит на элемент в таблице (isHover = true), когда покидает его (isHover = false),
	когда курсор движется (MouseMove) изменяются координаты для отрисовки изображения */
	const redrawHoverImg = (event: React.MouseEvent<HTMLDivElement>, imgPath: string) => {
		// Проверка на то, что курсор находится на элементе
		if (!isHover) {
			// Сброс координат, когда курсор покидает элемент
			setCoordinateHover(undefined)
			setImagePath(undefined)
			return
		}

		// Установка новых координат для изображения
		setCoordinateHover({x: event.pageX + positionHoverImage, y: event.pageY + positionHoverImage})
		setImagePath(imgPath)
	}

	/** Build DOM */
	return <div className='table-wrap'>
		<table className={`table ${loading ? 'table-loading-text' : ''}`}>
			{loading && <div className='table-loading'></div>}
			<thead>
			<tr>
				<th>Артикул</th>
				<th>На складе</th>
				<th>Общее кол-во</th>
				<th>Подсоединения</th>
				<th>Конфигурация</th>
				<th>Давление</th>
				<th>Мин темп</th>
				<th>Макс темп</th>
				<th>Cv</th>
				<th>Dn</th>
				<th>Цена</th>
			</tr>
			</thead>
			<tbody>
			{rows.slice(0, parseInt(size ?? '20')).map((itm: soldProducts, id: number) => {
				return <Fragment key={id}>
					<tr>
						<td className='vendor-code'>
							<a
								target='_blank'
								href={`/prod/${itm.vendorCode}`}
							>
								{itm.vendorCode}
							</a>
							{
								itm.types?.length && <Button
                                    title='' onClick={() => redrawComplement(itm.vendorCode)}
                                    className={`show-complement ${showComplement.includes(itm.vendorCode) ? '' : 'plus'} btn-secondary`}
                                    icon={<></>}
                                />
							}
						</td>
						<td>{itm.quantityInStock}</td>
						<td>{itm.totalQuantity}</td>
						<td>{itm.connectionInfo}</td>
						<td>
							{
								itm.geometricConfig && <div
                                    className='table-configuration'
                                    onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => redrawHoverImg(event, 'https://fld.ru/images/products/h-zur-4-2.jpg')}
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}
                                >
                                    <IoImage/>
									{itm.geometricConfig}
                                </div>
							}
						</td>
						<td>{itm.workingPressure}</td>
						<td>{itm.minTemperature}</td>
						<td>{itm.maxTemperature}</td>
						<td>{itm.cv}</td>
						<td>{itm.dn}</td>
						<td>{itm.price?.toFixed(2)}</td>
					</tr>
					{
						(itm.types && showComplement.includes(itm.vendorCode)) && itm.types.map(trComplement =>
							<tr className='complement'>
								<td>
									{trComplement.vendorCode}
									{/*<a*/}
									{/*	target='_blank'*/}
									{/*	href={`/prod/${trComplement.vendorCode}`}*/}
									{/*>*/}
									{/*	{trComplement.vendorCode}*/}
									{/*</a>*/}
								</td>
								<td>{trComplement.quantityInStock}</td>
								<td></td>
								<td>{itm.connectionInfo}</td>
								<td></td>
								<td>{itm.workingPressure}</td>
								<td>{itm.minTemperature}</td>
								<td>{itm.maxTemperature}</td>
								<td>{itm.cv}</td>
								<td>{itm.dn}</td>
								<td>{itm.price?.toFixed(2)}</td>
							</tr>)
					}
				</Fragment>
			})}
			</tbody>
		</table>

		<TableHover isHover={isHover} coordinateHover={coordinateHover} imagePath={imagePath}/>
	</div>
};

export default TableSoldProd;