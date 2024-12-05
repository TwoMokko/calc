import {MdCalculate} from "react-icons/md";
import {Button} from "../Button.tsx";
import ChoiceOptionsString from "../ChoiceOptionsString.tsx";
import {connection, physicalCharacteristics, sendData} from "../../types/Types.tsx";

export function Top({doReset, filter, onDeleteAtChoiceString}: {doReset: () => void, filter: sendData, onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void}): JSX.Element {
    return <div className='calc-top-wrap'>
        <div className='calc-top'>
            <h1>
                <MdCalculate/>
                <span>Поиск по характеристикам</span>
            </h1>
            <ChoiceOptionsString
                filter={filter}
                onDeleteAtChoiceString={onDeleteAtChoiceString}
            />
            <Button
                title='Очистить всё'
                className='reset btn-secondary'
                onClick={doReset}
            />
        </div>
    </div>
}
