import {FC} from "react";
import {sendData} from "../types/Types.tsx";
import {ru} from "../data/Languages.tsx";

interface ChoiceOptionsStringProps {
	filter: sendData,
	reset: (key: string) => void
}

const ChoiceOptionsString: FC<ChoiceOptionsStringProps> = ({filter, reset}): JSX.Element => {

	return <div className='choice'>
		{
			filter.options?.map(opt => <div
				key={opt.key}
				title={ru[opt.key].title}
				onClick={() => console.log('delete', opt.key)}
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
			}).map(con => <div
				key={con.connectionNo}
			>
				<span onClick={() => console.log('delete', con.connectionNo, ' type')} title={`Тип ${con.connectionNo}`}>{con.connectionType}</span>
				<span onClick={() => console.log('delete', con.connectionNo, ' size')} title={`Размер ${con.connectionNo}`}>{con.connectionSize}</span>
			</div>)
		}
		{
			filter.physicalCharacteristics && Object.entries(filter.physicalCharacteristics).map(char => <div
				key={char[0]}
				title={ru[char[0]].title}
				onClick={() => reset(char[0])}
			>
					{char[1]}
			</div>)
		}
	</div>
}

export default ChoiceOptionsString