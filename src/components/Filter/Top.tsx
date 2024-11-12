import {MdCalculate} from "react-icons/md";
import {Button} from "../Button.tsx";
import ChoiceOptionsString from "../ChoiceOptionsString.tsx";
import {sendData} from "../../types/Types.tsx";

export function Top({doReset, filter, resetChar}: {doReset: () => void, filter: sendData, resetChar: (key: string) => void}): JSX.Element {
    return <div
        className='calc-top'
    >
        <h1>
            <MdCalculate />
            <span>Поиск по характеристикам</span>
        </h1>
        <ChoiceOptionsString
            filter={filter}
            reset={resetChar}
        />
        <Button
            title='Очистить всё'
            className='reset btn-secondary'
            onClick={doReset}
        />
    </div>
}