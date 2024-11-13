import {FC} from "react";
import {connection, physicalCharacteristics, sendData} from "../types/Types.tsx";
import {ru} from "../data/Languages.tsx";

interface ChoiceOptionsStringProps {
	filter: sendData,
	onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void
}

const ChoiceOptionsString: FC<ChoiceOptionsStringProps> = ({filter, onDeleteAtChoiceString}): JSX.Element => {

	return <div className='choice'>
		{
			filter.options?.map(opt => <div
				key={opt.key}
				title={ru[opt.key].title}
				onClick={() => onDeleteAtChoiceString('onDeleteOption', opt.key)}
			>
				{opt.value}
			</div>)
		}
		{
			filter.connections?.sort(function (a, b): number {
				if (a.connectionNo && b.connectionNo) {
					return a.connectionNo > b.connectionNo ? 1 : -1
				}
				return 0
			}).map(con => <
			>
				{ con.connectionType &&
					<div onClick={() => onDeleteAtChoiceString('onDeleteConnection', {
					connectionNo: con.connectionNo,
					connectionSize: con.connectionSize
				})} title={`Тип ${con.connectionNo}`}>{con.connectionType}</div>
				}
				{ con.connectionSize &&
					<div onClick={() => onDeleteAtChoiceString('onDeleteConnection', {
					connectionNo: con.connectionNo,
					connectionType: con.connectionType
				})} title={`Размер ${con.connectionNo}`}>{con.connectionSize}</div>
				}
			</>)
		}
		{
			filter.physicalCharacteristics && Object.entries(filter.physicalCharacteristics).map(char => <div
				key={char[0]}
				title={ru[char[0]].title}
				onClick={() => onDeleteAtChoiceString('onDeleteCharacteristic', char[0])}
			>
					{char[1]}
			</div>)
		}
	</div>
}

export default ChoiceOptionsString