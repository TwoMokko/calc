import {ReactNode, useEffect, useRef, useState} from "react";
import {
    MdCreate, MdDiscFull,
    MdElectricBolt,
    MdFlipToBack,
    MdKeyboardArrowDown, MdOutlineCloseFullscreen,
    MdOutlineRemoveFromQueue,
    MdOutlineWbCloudy
} from "react-icons/md";

const ru: { [key: string]: string } = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "Серия",
    additionalCoverage: "Дополнительное покрытие",
    cleaningUnderOxygen: "Очистка под кислород",
    mainMaterial: "Основной материал",
    needleType: "Тип иглы",
    handleType: "Тип рукоятки",
    surfaceType: "Тип поверхности",
    sealMaterial: "Материал уплотнения",
    geometricConfiguration: "Геометрическая конфигурация изделия",
    loadOption: "Опция постоянной нагрузки у NV вентелей",
    panelMounting: "Крепление на панель",
    pressureOption345b: "Опция давления у NV",
    darinageOption: "Опция дренажа",
    connectionPlug: "Заглушка подсоединения",
    handleColor: "Цвет рукоятки",
    driveType: "Тип привода",
    conditionalPassageDiameter: "Нестандартное ДУ",
    filterType: "Тип фильтра",
    springType: "Тип пружины",
    perssureValveSetting: "Давление настройки клапана",
    highPressureOption: "Опция высокого давления",
    len: "Опция длины фитинга",
    zcrConnectionOption: "Опция плечиков у подсоеднения у ZCR",
    meltingPoint: "Температура плавления защитного материала заглушки",
    plasticBodyColor: "Цвет у брс",
    connectionTypes1: "Тип подсоединения 1",
    connectionTypes2: "Тип подсоединения 2",
    connectionTypes3: "Тип подсоединения 3",
    connectionTypes4: "Тип подсоединения 4",
    connectionSizes1: "Размер подсоединения 1",
    connectionSizes2: "Размер подсоединения 2",
    connectionSizes3: "Размер подсоединения 3",
    connectionSizes4: "Размер подсоединения 4",
}
const icon: { [key: string]: ReactNode } = {
    type: <MdElectricBolt/>,
    assembly: <MdElectricBolt/>,
    series: <MdElectricBolt/>,
    additionalCoverage: <MdElectricBolt/>,
    cleaningUnderOxygen: <MdOutlineWbCloudy/>,
    mainMaterial: <MdFlipToBack/>,
    needleType: <MdCreate/>,
    handleType: <MdElectricBolt/>,
    surfaceType: <MdElectricBolt/>,
    sealMaterial: <MdElectricBolt/>,
    geometricConfiguration: <MdElectricBolt/>,
    loadOption: <MdElectricBolt/>,
    panelMounting: <MdOutlineRemoveFromQueue/>,
    pressureOption345b: <MdElectricBolt/>,
    darinageOption: <MdElectricBolt/>,
    connectionPlug: <MdElectricBolt/>,
    handleColor: <MdElectricBolt/>,
    driveType: <MdElectricBolt/>,
    conditionalPassageDiameter: <MdElectricBolt/>,
    filterType: <MdDiscFull/>,
    springType: <MdElectricBolt/>,
    perssureValveSetting: <MdElectricBolt/>,
    highPressureOption: <MdElectricBolt/>,
    len: <MdElectricBolt/>,
    zcrConnectionOption: <MdElectricBolt/>,
    meltingPoint: <MdElectricBolt/>,
    plasticBodyColor: <MdElectricBolt/>,
    connectionTypes1: <MdOutlineCloseFullscreen/>,
    connectionTypes2: <MdOutlineCloseFullscreen/>,
    connectionTypes3: <MdOutlineCloseFullscreen/>,
    connectionTypes4: <MdOutlineCloseFullscreen />,
    connectionSizes1: <MdElectricBolt/>,
    connectionSizes2: <MdElectricBolt/>,
    connectionSizes3: <MdElectricBolt/>,
    connectionSizes4: <MdElectricBolt/>,
}

export function SelectCard({value, option, values, onChange, highlight, onDelete}: {
    value?: string,
    option: string,
    values: string[],
    onChange: (value: string) => void,
    highlight: string[] | undefined,
    onDelete?: () => void
}): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showList, setShowList] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [currentValues, setCurrentValues] = useState<string[]>(values)

    const [currentValue, setCurrentValue] = useState<string>('')
    const [className, setClassName] = useState<string>()

    useEffect(() => {
        const method = () => {
            if (inputRef.current != document.activeElement)
                setShowList(false)
        }

        document.addEventListener('click', method, false)
        return () => document.removeEventListener('click', method, false)
    }, []);


    const focusInput = () => {
        if (showList && inputRef.current)
            inputRef.current.focus()
    }

    useEffect(focusInput, [showList]);

    useEffect(() => {
        setCurrentValue(value ?? '')
    }, [value])


    function doClick(val: string): void {
        setCurrentValue(val)
        onChange(val)
    }

    function onReset() {
        onDelete && onDelete()
        setCurrentValue('')
    }


    useEffect(() => {
        setCurrentValues(prev => {
            return [
                ...prev.sort((a, b) => {

                    const aIn = highlight?.includes(a)
                    const bIn = highlight?.includes(b)

                    if (inputValue) {
                        let aSearch = a.search(inputValue.toUpperCase()) != -1
                        let bSearch = b.search(inputValue.toUpperCase()) != -1

                        if (aSearch && !bSearch)
                            return -1
                        else if (bSearch && !aSearch)
                            return +1;

                        return 0
                    } else {

                        if (aIn && !bIn)
                            return -1
                        else if (bIn && !aIn)
                            return +1;

                        return 0
                    }
                })
            ]
        })
    }, [highlight, inputValue])

    useEffect(() => {
        currentValue ?
            ( highlight?.length ?
                ( highlight?.includes(currentValue) ? setClassName('well') : setClassName('error') )
                : setClassName('selected-disable') )
            : ( highlight?.length ? setClassName('well') : setClassName('disable') )
    }, [highlight, currentValue]);


    return <div className={`input-search ${className}`}>
        <div className='input-search-head'>
            <h4>{ru[option]}</h4>
            {
                inputValue && <div
                    // onClick={onReset}
                    onClick={() => {
                        setInputValue('')
                        onReset()
                    }}
                    className='reset-option'
                    title={`сбросить всё для ${ru[option]}`}
                >
                </div>
            }
        </div>
        <div className='input-search-wrap'>
            <div className='input-search-wrap-top'
                 onClick={() => setShowList(true)}
            >
                {icon[option]}

                {currentValue ? <div
                    className='checked-list-item'
                    onMouseDown={onReset}
                    title={`сбросить значение: ${currentValue}`}
                >
                    <div>{currentValue}</div>
                    <div
                        className='unchecked'
                    ></div>
                </div> : ''}


                <div className='input-search-wrap-text'>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={event => {
                            setInputValue(event.currentTarget.value)
                        }}
                    />
                </div>
                <MdKeyboardArrowDown
                    className={`${showList ? 'show' : ''}`}
                />
            </div>
            {showList && <div className='input-search-list'>
                {
                    currentValues.map((val) => {
                        return <div
                            key={val}
                            className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (val == currentValue ? className : 'disable')}`}
                            onMouseDown={() => doClick(val)}
                        >{!inputValue
                            ? val
                            : <span
                                dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>
                        }</div>
                    })
                }
            </div>}
        </div>
    </div>
}