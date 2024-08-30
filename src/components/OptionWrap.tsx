import {InputCard} from "./InputCard.tsx";
import {Connection} from "./Connection.tsx";
import {optionsData} from "../routes/CalcPage.tsx";
import {InputCardMultiple} from "./InputCardMultiple.tsx";

export function OptionWrap({data}: {data: optionsData}): JSX.Element {


    return <section className='option'>
        <h2>Опции</h2>

        <section className='option-type'>
            <InputCardMultiple title='Тип изделия' values={data.type} />
        </section>

        <section className='option-main'>
            {
                data.options.map(option => {
                    return <InputCard key={option.key} option={option.key} values={option.value}/>
                })
            }
        </section>

        <section className='option-connections block'>
            {
                data.connections.map(connection => {
                    return <Connection key={connection.connectionNo} connection={connection}/>
                })
            }
        </section>
    </section>
}