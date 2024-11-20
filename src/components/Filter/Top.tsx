import {FC} from "react";
import { MdCalculate } from "react-icons/md";
import { Button } from "../Button.tsx";
import { OptionsLine } from "../OptionsLine.tsx";
import { connection, physicalCharacteristics, sendData } from "../../types/Types.tsx";

interface TopProps {
    doReset: () => void,
    filter: sendData,
    onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void
}

export const Top: FC<TopProps> = ({doReset, filter, onDeleteAtChoiceString}): JSX.Element => {
    return <div className='calc-top-wrap'>
        <div className='calc-top'>
            <h1>
                <MdCalculate/>
                <span>Поиск по характеристикам</span>
            </h1>
            <Button
                title='Очистить всё'
                className='reset btn-secondary'
                onClick={doReset}
            />
        </div>
        <OptionsLine
            filter={filter}
            onDeleteAtChoiceString={onDeleteAtChoiceString}
        />
    </div>
}
