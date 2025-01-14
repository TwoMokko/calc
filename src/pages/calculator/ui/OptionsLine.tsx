import {FC, ReactNode, useEffect, useState} from "react";
import { connection, physicalCharacteristics, sendData } from "../../../app/types/types.ts";
import { ru } from "../config/Languages.tsx";

interface ChoiceOptionsStringProps {
	filter: sendData,
	onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void,
}

export const OptionsLine: FC<ChoiceOptionsStringProps> = ({filter, onDeleteAtChoiceString}): ReactNode => {
	/** Constants */
	const [show, setShow] = useState<boolean>(false)					// отвечает за то, показать или срыть весь компонент


	/** UseEffects */
	/* Если нечего показывать в строке, то меняем состояние, чтобы поменялся класс (для плавного появления-исчезновения) */
	useEffect(() => {
		(!filter.options && !filter.physicalCharacteristics && !filter.connections?.length && !filter.geometricConfig) ? setShow(false) : setShow(true)
	}, [filter]);


	/** Build DOM */
	return <div className={`option-line ${show ? 'show' : ''}`}>
		{
			// Бежим по выбранным опциям и отрисовываем их в строке
			filter.options?.map(opt => <div
				key={opt.key}
				title={ru[opt.key].title}
				onClick={() => onDeleteAtChoiceString('onDeleteOption', opt.key)}
				className='checked-list-item'
			>
				{ru[opt.key].icon}
				<div>{opt.value}</div>
				<div className='unchecked'></div>
			</div>)
		}
		{
			// Сортируем выбранные подсоединения по номеру подсоединений, после бежим по ним и отрисовываем их в строке
			filter.connections?.sort(function (a, b): number {
				if (a.connectionNo && b.connectionNo) {
					return a.connectionNo > b.connectionNo ? 1 : -1
				}
				return 0
			}).map(con => <
			>
				{
					// Если в цикле массив connection имеет тип подсоединения, то отрисовываем его, иначе ничего не делаем
					con.connectionType &&
                    <div onClick={() => onDeleteAtChoiceString('onDeleteConnection', {
						connectionNo: con.connectionNo,
						connectionSize: con.connectionSize
					})} title={`Тип ${con.connectionNo}`} className='checked-list-item'>
						{ru[`connectionTypes${con.connectionNo}`].icon}
                        <div>{con.connectionType}</div>
                        <div className='unchecked'></div>
                    </div>
				}
				{
					// Если в цикле массив connection имеет размер подсоединения, то отрисовываем его, иначе ничего не делаем
					con.connectionSize &&
                    <div onClick={() => onDeleteAtChoiceString('onDeleteConnection', {
						connectionNo: con.connectionNo,
						connectionType: con.connectionType
					})} title={`Размер ${con.connectionNo}`} className='checked-list-item'>
						{ru[`connectionSizes${con.connectionNo}`].icon}
                        <div>{con.connectionSize}</div>
                        <div className='unchecked'></div>
                    </div>
				}
			</>)
		}
		{
			// Бежим по выбранным характеристикам и,если они существуют, отрисовываем их в строке
			filter.physicalCharacteristics && Object.entries(filter.physicalCharacteristics).map(char => {
				if (char[1]) return <div
					key={char[0]}
					title={ru[char[0]].title}
					onClick={() => onDeleteAtChoiceString('onDeleteCharacteristic', char[0])}
					className='checked-list-item'
				>
					{ru[char[0]].icon}
					<div>{char[1]}</div>
					<div className='unchecked'></div>
				</div>
			})
		}
		{
			filter.geometricConfig && <div
				title={ru['geometricConfig'].title}
				onClick={() => onDeleteAtChoiceString('onDeleteGeometricConfig', '')}
				className='checked-list-item'
			>
				{ru['geometricConfig'].icon}
				<div>{filter.geometricConfig}</div>
				<div className='unchecked'></div>
			</div>
		}
	</div>
}
