import {ReactNode, useEffect, useRef, useState} from "react";
import {
    MdElectricBolt,
    MdKeyboardArrowDown,
    MdOutlineCloseFullscreen,
} from "react-icons/md";

const ru: { [key: string]: string } = {
    type: "Тип изделия",
    o_type: 'Тип изделия',
    o_comp: 'Корпус или сборка',
    o_serie: 'Серия',
    o_sog: 'Дополнительное покрытие',
    o_os: 'Отчистка под кислород',
    o_bod_mat: 'Основной материал',
    o_col_mark: 'Цвет брс',
    o_stem: 'Тип иглы',
    o_handle: 'Тип рукоятки',
    o_surf: 'Тип поверхности',
    o_seal: 'Материал уплотнения',
    o_conf: 'Геометрическая конфигурация изделия',
    o_fe: 'Опция постоянной нагрузки у NV вентелей',
    o_panel: 'Крепление на панель',
    o_345b: 'Опция давления у NV',
    o_vent: 'Опция дренажа',
    o_plug: 'Заглушка подсоединения',
    o_han_col: 'Цвет рукоятки',
    o_actu: 'Тип привода',
    o_dn: 'Нестандартное ДУ',
    o_filt: 'Тип фильтра',
    o_spri: 'Тип пружины',
    o_ps: 'Давление настройки клапана',
    o_hp: 'Опция высокого давления',
    o_len: 'Опция длины фитинга',
    o_shoul: 'Опция плечиков у подсоединения у ZRC',
    o_fusible: 'Температура плавления защитного материала заглушки',
    o_col: 'Цвет у брс',
    o_elem_mat: 'Материал болтов и пластин',
    o_bod_size: 'Габаритные размеры зажима',
    o_sec_mat: 'Материал секции',
    o_win_mat: 'Материал окна',
    o_spring_mat: 'Материал чувствительного элемента',
    o_rs: 'Демпфер',
    o_cl: 'Класс точности',
    o_filling: 'Заполнение',
    o_mp: 'Указатель максимального давления',
    o_scale_size: 'Размер шкалы',
    o_scale_unit1: 'Единица измерения шкалы 1',
    o_scale_unit2: 'Единица измерения шкалы 2',
    o_pointer_color: 'Цвет указателя рабочего давления',
    o_bo: 'Выдуваемая задняя стенка',
    o_conn_conf: 'Действие электроконтактов',
    o_ep: 'Электрополировка',
    o_bf: 'Насечка под монтажный фланец',
    o_ak: 'Винт для найстройки',
    o_ve: 'Поверка',
    o_microswitch: 'Форма микропереключателей',
    o_wateproof: 'Влагозащита',
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
    type: <MdElectricBolt />,
    o_type: <MdElectricBolt />,
    o_comp: <MdElectricBolt />,
    o_serie: <MdElectricBolt />,
    o_sog: <MdElectricBolt />,
    o_os: <MdElectricBolt />,
    o_bod_mat: <MdElectricBolt />,
    o_col_mark: <MdElectricBolt />,
    o_stem: <MdElectricBolt />,
    o_handle: <MdElectricBolt />,
    o_surf: <MdElectricBolt />,
    o_seal: <MdElectricBolt />,
    o_conf: <MdElectricBolt />,
    o_fe: <MdElectricBolt />,
    o_panel: <MdElectricBolt />,
    o_345b: <MdElectricBolt />,
    o_vent: <MdElectricBolt />,
    o_plug: <MdElectricBolt />,
    o_han_col: <MdElectricBolt />,
    o_actu: <MdElectricBolt />,
    o_dn: <MdElectricBolt />,
    o_filt: <MdElectricBolt />,
    o_spri: <MdElectricBolt />,
    o_ps: <MdElectricBolt />,
    o_hp: <MdElectricBolt />,
    o_len: <MdElectricBolt />,
    o_shoul: <MdElectricBolt />,
    o_fusible: <MdElectricBolt />,
    o_col: <MdElectricBolt />,
    o_elem_mat: <MdElectricBolt />,
    o_bod_size: <MdElectricBolt />,
    o_sec_mat: <MdElectricBolt />,
    o_win_mat: <MdElectricBolt />,
    o_spring_mat: <MdElectricBolt />,
    o_rs: <MdElectricBolt />,
    o_cl: <MdElectricBolt />,
    o_filling: <MdElectricBolt />,
    o_mp: <MdElectricBolt />,
    o_scale_size: <MdElectricBolt />,
    o_scale_unit1: <MdElectricBolt />,
    o_scale_unit2: <MdElectricBolt />,
    o_pointer_color: <MdElectricBolt />,
    o_bo: <MdElectricBolt />,
    o_conn_conf: <MdElectricBolt />,
    o_ep: <MdElectricBolt />,
    o_bf: <MdElectricBolt />,
    o_ak: <MdElectricBolt />,
    o_ve: <MdElectricBolt />,
    o_microswitch: <MdElectricBolt />,
    o_wateproof: <MdElectricBolt />,
    connectionTypes1: <MdOutlineCloseFullscreen/>,
    connectionTypes2: <MdOutlineCloseFullscreen/>,
    connectionTypes3: <MdOutlineCloseFullscreen/>,
    connectionTypes4: <MdOutlineCloseFullscreen />,
    connectionSizes1: <MdElectricBolt/>,
    connectionSizes2: <MdElectricBolt/>,
    connectionSizes3: <MdElectricBolt/>,
    connectionSizes4: <MdElectricBolt/>,
}

// const iconOld: { [key: string]: ReactNode } = {
//     type: <MdElectricBolt/>,
//     assembly: <MdElectricBolt/>,
//     series: <MdElectricBolt/>,
//     additionalCoverage: <MdElectricBolt/>,
//     cleaningUnderOxygen: <MdOutlineWbCloudy/>,
//     mainMaterial: <MdFlipToBack/>,
//     needleType: <MdCreate/>,
//     handleType: <MdElectricBolt/>,
//     surfaceType: <MdElectricBolt/>,
//     sealMaterial: <MdElectricBolt/>,
//     geometricConfiguration: <MdElectricBolt/>,
//     loadOption: <MdElectricBolt/>,
//     panelMounting: <MdOutlineRemoveFromQueue/>,
//     pressureOption345b: <MdElectricBolt/>,
//     darinageOption: <MdElectricBolt/>,
//     connectionPlug: <MdElectricBolt/>,
//     handleColor: <MdElectricBolt/>,
//     driveType: <MdElectricBolt/>,
//     conditionalPassageDiameter: <MdElectricBolt/>,
//     filterType: <MdDiscFull/>,
//     springType: <MdElectricBolt/>,
//     perssureValveSetting: <MdElectricBolt/>,
//     highPressureOption: <MdElectricBolt/>,
//     len: <MdElectricBolt/>,
//     zcrConnectionOption: <MdElectricBolt/>,
//     meltingPoint: <MdElectricBolt/>,
//     plasticBodyColor: <MdElectricBolt/>,
//     connectionTypes1: <MdOutlineCloseFullscreen/>,
//     connectionTypes2: <MdOutlineCloseFullscreen/>,
//     connectionTypes3: <MdOutlineCloseFullscreen/>,
//     connectionTypes4: <MdOutlineCloseFullscreen />,
//     connectionSizes1: <MdElectricBolt/>,
//     connectionSizes2: <MdElectricBolt/>,
//     connectionSizes3: <MdElectricBolt/>,
//     connectionSizes4: <MdElectricBolt/>,
// }

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