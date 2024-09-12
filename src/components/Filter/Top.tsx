import {MdCalculate} from "react-icons/md";
import {Button} from "../Button.tsx";

export function Top({doReset}: {doReset: () => void}): JSX.Element {
    return <div
        className='calc-top'
    >
        <h1>
            <MdCalculate />
            <span>Поиск по характеристикам</span>
        </h1>
        <Button
            title='Очистить всё'
            className='reset btn-secondary'
            onClick={doReset}
        />
    </div>
}