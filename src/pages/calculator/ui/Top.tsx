import { FC, ReactNode } from "react";
import { connection, physicalCharacteristics, sendData } from "../config/types.ts";
import { MdCalculate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import OptionsLine from "./OptionsLine.tsx";
import Button from "../../../shared/ui/Button.tsx";

interface TopProps {
    doReset: () => void,
    filter: sendData,
    onDeleteAtChoiceString: (funcName: string, key: string | connection | keyof physicalCharacteristics) => void,
    checkHideOptions: { val: boolean, setVal: (checked: boolean) => void }
}

const Top: FC<TopProps> = ({doReset, filter, onDeleteAtChoiceString, checkHideOptions}): ReactNode => {

    return <div className='calc-top-wrap'>
        <div className='calc-top'>
            <h1>
                <MdCalculate/>
                <span>Поиск по характеристикам</span>
            </h1>
            <div className='calc-top-checkbox'>
                <label className='input-search-list-item'>
                    <input
                        className='hide'
                        type='checkbox'
                        checked={checkHideOptions.val}
                        onChange={(event) => checkHideOptions.setVal(event.target.checked)}
                    />
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

export default Top
