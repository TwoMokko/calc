import { FC, ReactNode } from "react";
import { MdCalculate } from "react-icons/md";
import { Button } from "../../../shared/ui/Button.tsx";
import { OptionsLine } from "./OptionsLine.tsx";
import { connection, physicalCharacteristics, sendData } from "../config/types.ts";
import { RxCross2 } from "react-icons/rx";

interface TopProps {
    doReset: () => void,
    filter: sendData,
    onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void,
    checkHideOpt: (checked: boolean) => void
}

export const Top: FC<TopProps> = ({doReset, filter, onDeleteAtChoiceString, checkHideOpt}): ReactNode => {

    return <div className='calc-top-wrap'>
        <div className='calc-top'>
            <h1>
                <MdCalculate/>
                <span>Поиск по характеристикам</span>
            </h1>
            <div className='calc-top-checkbox'>
                <label className='input-search-list-item'>
                    <input className='hide' type='checkbox' onChange={(event) => checkHideOpt(event.target.checked)}/>
                    <div className='check'>Все опции</div>
                </label>
            </div>
            <Button
                title='Очистить всё'
                className='reset btn-secondary'
                onClick={doReset}
                icon={<RxCross2 />}
            />
        </div>
        <OptionsLine
            filter={filter}
            onDeleteAtChoiceString={onDeleteAtChoiceString}
        />
    </div>
}
