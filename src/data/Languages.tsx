import {
	Md10K,
	MdAbc,
	MdAllInbox,
	MdAnalytics,
	MdAnimation,
	MdApi,
	MdAutoFixHigh,
	MdBrunchDining,
	MdCarCrash,
	MdCasino,
	MdCelebration,
	MdCloudySnowing,
	MdConveyorBelt,
	MdCrisisAlert,
	MdCropRotate,
	MdDiversity2,
	MdExpand,
	MdExplore,
	MdHive,
	MdNetworkPing,
	MdOutline123,
	MdOutlineAirlineStops,
	MdOutlineAltRoute,
	MdOutlineCenterFocusStrong,
	MdOutlineCenterFocusWeak,
	MdOutlineCloseFullscreen,
	MdOutlineCompareArrows,
	MdOutlineCropOriginal,
	MdOutlineDeviceThermostat,
	MdOutlineDocumentScanner,
	MdOutlineEscalator,
	MdOutlineEventNote,
	MdOutlineFence,
	MdOutlineFilterFrames,
	MdOutlineFilterTiltShift,
	MdOutlineFullscreen,
	MdOutlineFullscreenExit,
	MdOutlineHardware,
	MdOutlineLensBlur,
	MdOutlineLocationSearching,
	MdOutlineMenuOpen,
	MdOutlineMerge,
	MdOutlineMergeType,
	MdOutlineMoveUp,
	MdOutlineNfc,
	MdOutlinePin,
	MdOutlineShutterSpeed,
	MdOutlineStarHalf,
	MdOutlineStream,
	MdOutlineSummarize,
	MdOutlineThermostat,
	MdParagliding,
	MdPlumbing,
	MdPowerInput,
	MdSensorWindow,
	MdSwipeUpAlt,
	MdSwitchCamera,
	MdTireRepair,
	MdTornado,
	MdTune,
	MdUpcoming,
	MdVignette,
	MdWater,
	MdZoomInMap
} from "react-icons/md";
import { languageData } from "../types/Types.tsx";
import { BiSortAlt2 } from "react-icons/bi";

/* Для отрисовки селектов на странице фильтра */
export const ru:  languageData = {
	type: { title: "Тип изделия", icon: <MdHive /> },
	o_type: { title: 'Тип изделия', icon: <MdOutlineDocumentScanner /> },
	o_comp: { title: 'Корпус или сборка', icon: <MdOutlineNfc /> },
	o_serie: { title: 'Серия', icon: <MdOutlinePin /> },
	o_sog: { title: 'Дополнительное покрытие', icon: <MdOutlineShutterSpeed /> },
	o_os: { title: 'Отчистка под кислород', icon: <MdOutlineStream /> },
	o_bod_mat: { title: 'Основной материал', icon: <MdOutlineSummarize /> },
	o_col_mark: { title: 'Цвет брс', icon: <MdOutlineStarHalf /> },
	o_stem: { title: 'Тип иглы', icon: <MdParagliding /> },
	o_handle: { title: 'Тип рукоятки', icon: <MdPlumbing /> },
	o_surf: { title: 'Тип поверхности', icon: <MdPowerInput /> },
	o_seal: { title: 'Материал уплотнения', icon: <MdSwitchCamera /> },
	o_conf: { title: 'Геометрическая конфигурация изделия', icon: <MdSwipeUpAlt /> },
	o_fe: { title: 'Опция постоянной нагрузки у NV вентелей', icon: <MdTireRepair /> },
	o_panel: { title: 'Крепление на панель', icon: <MdTornado /> },
	o_345b: { title: 'Опция давления у NV', icon: <MdUpcoming /> },
	o_vent: { title: 'Опция дренажа', icon: <MdWater /> },
	o_plug: { title: 'Заглушка подсоединения', icon: <MdVignette /> },
	o_han_col: { title: 'Цвет рукоятки', icon: <MdAutoFixHigh /> },
	o_actu: { title: 'Тип привода', icon: <MdCarCrash /> },
	o_dn: { title: 'Нестандартное ДУ', icon: <MdCelebration /> },
	o_filt: { title: 'Тип фильтра', icon: <MdCasino /> },
	o_spri: { title: 'Тип пружины', icon: <MdExpand /> },
	o_ps: { title: 'Давление настройки клапана', icon: <Md10K /> },
	o_hp: { title: 'Опция высокого давления', icon: <MdConveyorBelt /> },
	o_len: { title: 'Опция длины фитинга', icon: <MdNetworkPing /> },
	o_shoul: { title: 'Опция плечиков у подсоединения у ZRC', icon: <MdOutlineAirlineStops /> },
	o_fusible: { title: 'Температура плавления защитного материала заглушки', icon: <MdOutlineDeviceThermostat /> },
	o_col: { title: 'Цвет у брс', icon: <MdOutlineCropOriginal /> },
	o_elem_mat: { title: 'Материал болтов и пластин', icon: <MdOutlineEscalator /> },
	o_bod_size: { title: 'Габаритные размеры зажима', icon: <MdOutlineEventNote /> },
	o_sec_mat: { title: 'Материал секции', icon: <MdOutlineFence /> },
	o_win_mat: { title: 'Материал окна', icon: <MdOutlineFilterFrames /> },
	o_spring_mat: { title: 'Материал чувствительного элемента', icon: <MdOutlineFilterTiltShift /> },
	o_rs: { title: 'Демпфер', icon: <MdOutlineHardware /> },
	o_cl: { title: 'Класс точности', icon: <MdOutlineLocationSearching /> },
	o_filling: { title: 'Заполнение', icon: <MdOutlineLensBlur /> },
	o_mp: { title: 'Указатель максимального давления', icon: <MdZoomInMap /> },
	o_scale_size: { title: 'Размер шкалы', icon: <MdTune /> },
	o_scale_unit1: { title: 'Единица измерения шкалы 1', icon: <MdOutline123 /> },
	o_scale_unit2: { title: 'Единица измерения шкалы 2', icon: <MdAbc /> },
	o_pointer_color: { title: 'Цвет указателя рабочего давления', icon: <MdAllInbox /> },
	o_bo: { title: 'Выдуваемая задняя стенка', icon: <MdAnimation /> },
	o_conn_conf: { title: 'Действие электроконтактов', icon: <MdAnalytics /> },
	o_ep: { title: 'Электрополировка', icon: <MdApi /> },
	o_bf: { title: 'Насечка под монтажный фланец', icon: <MdBrunchDining /> },
	o_ak: { title: 'Винт для найстройки', icon: <MdCrisisAlert /> },
	o_ve: { title: 'Поверка', icon: <MdCropRotate /> },
	o_microswitch: { title: 'Форма микропереключателей', icon: <MdDiversity2 /> },
	o_wateproof: { title: 'Влагозащита', icon: <MdCloudySnowing /> },
	connectionTypes1: { title: "Тип подсоединения 1", icon: <MdOutlineAltRoute /> },
	connectionTypes2: { title: "Тип подсоединения 2", icon: <MdOutlineCenterFocusStrong /> },
	connectionTypes3: { title: "Тип подсоединения 3", icon: <MdOutlineCloseFullscreen /> },
	connectionTypes4: { title: "Тип подсоединения 4", icon: <MdOutlineCompareArrows /> },
	connectionSizes1: { title: "Размер подсоединения 1", icon: <MdOutlineMenuOpen /> },
	connectionSizes2: { title: "Размер подсоединения 2", icon: <MdOutlineMerge /> },
	connectionSizes3: { title: "Размер подсоединения 3", icon: <MdOutlineMergeType /> },
	connectionSizes4: { title: "Размер подсоединения 4", icon: <MdOutlineMoveUp /> },
	minTemperature: { title: 'Мин температура рабочей среды', icon: <MdOutlineThermostat /> },
	minPressure: { title: 'Мин давление настройки', icon: <MdOutlineFullscreenExit /> },
	cv: { title: 'Cv', icon: <MdSensorWindow /> },
	bodyPressure: { title: 'Рабочее давление', icon: <MdExplore /> },
	maxTemperature: { title: 'Макс температура рабочей среды', icon: <MdOutlineThermostat /> },
	maxPressure: { title: 'Макс давление настройки', icon: <MdOutlineFullscreen /> },
	dn: { title: 'Dn', icon: <MdOutlineCenterFocusWeak /> },
	sortState: { title: 'Сортировка', icon: <BiSortAlt2 /> },
}