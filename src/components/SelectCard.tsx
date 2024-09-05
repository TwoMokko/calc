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

export function SelectCard({value, option, values, onChange, highlight}: {value?: string, option: string, values: string[],  onChange: (value: string) => void, highlight: string[] | undefined}): JSX.Element {
    // TODO: !showList при нажатии на элемент листа и при нажатии вне инпута

    const [showList, setShowList] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [currentValues, setCurrentValues] = useState<string[]>(values)


    useEffect(() => {
        setInputValue(value ?? '')
    }, [value])


    function doClick(val: string): void {
        setInputValue(val)
        setShowList(!showList)
        onChange(val)
    }

    useEffect(() => {
        setCurrentValues(prev => {
            return [
                ...prev.sort((a, b) => {
                    if (inputValue) {
                        const aSearch = a.search(inputValue) != -1
                        const bSearch = b.search(inputValue) != -1

                        if (aSearch || bSearch)
                            return aSearch ? -1 : +1
                    }

                    const aIn = highlight?.includes(a)
                    const bIn = highlight?.includes(b)

                    if (aIn && !bIn)
                        return -1
                    else if (bIn && !aIn)
                        return +1;

                    return 0
                })
            ]
        })
    }, [highlight, inputValue]);


    return <div className='input-search'>
        <h4 className={highlight?.length ? 'suit' : ''}>{ru[option]}</h4>
        <div className='input-search-wrap'>
            <input
                onClick={() => setShowList(!showList)}
                value={inputValue}
                onChange={event => setInputValue(event.currentTarget.value)}
                onBlur={() => setTimeout(() => setShowList(false), 100)}
            />
            {showList && <div className='input-search-list'>
                {
                    currentValues.map((val) => {
                        return <div
                            key={val}
                            className={`input-search-list-item ${highlight?.includes(val) ? 'suit' : ''}`}
                            onClick={() => {doClick(val)}}
                        >{!inputValue
                            ? val
                            : <span dangerouslySetInnerHTML={{__html: val.replace(inputValue, `<mark>${inputValue}</mark>`)}} />
                        }</div>
                    })
                }
            </div>}
        </div>
    </div>
}