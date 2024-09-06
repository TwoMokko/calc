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

export function SelectCard({value, option, values, onChange, highlight, onDelete}: {value?: string, option: string, values: string[],  onChange: (value: string) => void, highlight: string[] | undefined, onDelete?: () => void}): JSX.Element {

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

    function onReset(){
        setInputValue('')
        setShowList(false)
        onDelete && onDelete()
    }


    useEffect(() => {
        setCurrentValues(prev => {
            return [
                ...prev.sort((a, b) => {

                    if (inputValue) {
                        console.log(inputValue)
                        const aSearch = a.search(inputValue.toUpperCase()) != -1
                        const bSearch = b.search(inputValue.toUpperCase()) != -1

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
    }, [highlight, inputValue])


    // useEffect(() => {
    //     setCurrentValues(prev => {
    //         return [
    //             ...prev.sort((a, b) => {
    //
    //                 const aIn = highlight?.includes(a)
    //                 const bIn = highlight?.includes(b)
    //                 let aSearch = false
    //                 let bSearch = false
    //
    //                 if (inputValue) {
    //                     aSearch = a.search(inputValue.toUpperCase()) != -1
    //                     bSearch = b.search(inputValue.toUpperCase()) != -1
    //                 }
    //
    //                 if (aIn && aSearch && !bIn)
    //                     return -1
    //                 else if (bIn && bSearch && !aIn)
    //                     return +1;
    //
    //                 return 0
    //             })
    //         ]
    //     })
    // }, [highlight, inputValue])



    return <div className={`input-search ${highlight?.length ? '' : 'disable'}`}>
        <div className='input-search-head'>
            <h4>{ru[option]}</h4>
            <span
                onClick={onReset}
                className='reset-option'
                title={`сбросить: ${ru[option]}`}
            >
            </span>
        </div>
        <div className='input-search-wrap'>
            <input
                onClick={() => setShowList(!showList)}
                value={inputValue}
                onChange={event => {
                    setInputValue(event.currentTarget.value)
                    setShowList(true)
                }}
                onBlur={() => setTimeout(() => setShowList(false), 100)}
            />
            {showList && <div className='input-search-list'>
                {
                    currentValues.map((val) => {
                        return <div
                            key={val}
                            className={`input-search-list-item ${highlight?.includes(val) ? '' : 'disable'}`}
                            onClick={() => doClick(val)}
                        >{!inputValue
                            ? val
                            : <span dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}} />
                        }</div>
                    })
                }
            </div>}
        </div>
    </div>
}