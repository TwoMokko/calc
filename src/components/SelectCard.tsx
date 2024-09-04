import {useEffect, useState} from "react";

const ru: {[key: string]: string} = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "серия",
    additionalCoverage: "дополнительное покрытие",
    cleaningUnderOxygen: "очистка под кислород",
    mainMaterial: "основной материал",
    needleType: "тип иглы",
    handleType: "тип рукоятки",
    surfaceType: "тип поверхности",
    sealMaterial: "материал уплотнения",
    geometricConfiguration: "геометрическая конфигурация изделия",
    loadOption: "опция постоянной нагрузки у NV вентелей",
    panelMounting: "крепление на панель",
    pressureOption345b: "опция давления у NV",
    darinageOption: "опция дренажа",
    connectionPlug: "заглушка подсоединения",
    handleColor: "цвет рукоятки",
    driveType: "тип привода",
    conditionalPassageDiameter: "нестандартное ДУ",
    filterType: "тип фильтра",
    springType: "тип пружины",
    perssureValveSetting: "давление настройки клапана",
    highPressureOption: "опция высокого давления",
    len: "опция длины фитинга",
    zcrConnectionOption: "опция плечиков у подсоеднения у ZCR",
    meltingPoint: "Температура плавления защитного материала заглушки",
    plasticBodyColor: "цвет у брс",
    connectionTypes1: "Тип подсоединения 1",
    connectionTypes2: "Тип подсоединения 2",
    connectionTypes3: "Тип подсоединения 3",
    connectionTypes4: "Тип подсоединения 4",
    connectionSizes1: "Размер подсоединения 1",
    connectionSizes2: "Размер подсоединения 2",
    connectionSizes3: "Размер подсоединения 3",
    connectionSizes4: "Размер подсоединения 4",
}

export function SelectCard({value, option, values, onChange}: {value?: string, option: string, values: string[],  onChange: (value: string) => void}): JSX.Element {
    // TODO: !showList при нажатии на элемент листа и при нажатии вне инпута

    const [showList, setShowList] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')


    useEffect(() => {
        setInputValue(value ?? '')
    }, [value]);
    function doClick(val: string): void {
        setInputValue(val)
        setShowList(!showList)
        onChange(val)
    }

    return <div className='input-search'>
        <h4>{ru[option]}</h4>
        <div className='input-search-wrap'>
            <input
                onClick={() => setShowList(!showList)}
                value={inputValue}
                onChange={event => setInputValue(event.currentTarget.value)}
                onBlur={() => setTimeout(() => setShowList(false), 100)}
            />
            {showList && <div className='input-search-list'>
                {
                    values.map(val => {
                        return <div
                            key={val}
                            className='input-search-list-item'
                            onClick={() => {doClick(val)}}
                        >{val}</div>
                    })
                }
            </div>}
        </div>
    </div>
}