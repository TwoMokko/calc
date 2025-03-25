import {
	MdCalculate,
	MdAutoAwesomeMosaic,
	MdElectricalServices,
	MdExtension, MdFactory,
	MdFilterBAndW,
	MdFilterHdr
} from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaTape } from "react-icons/fa";
import { RiPassportFill } from "react-icons/ri";
import { PiCubeFill } from "react-icons/pi";
import {sidebarLink} from "./types.ts";

export const ruSidebarLinks: sidebarLink[] = [
	{
		title: 'Поиск по характеристикам',
		route: '',
		icon: <MdCalculate />
	},
	{
		title: 'Генерация 3Д моделей',
		route: 'models',
		icon: <PiCubeFill />
	},
	{
		title: 'Генерация тех паспортов',
		route: 'passport',
		icon: <AiFillSafetyCertificate />,
		isDisabled: true
	},
	{
		title: 'Форма закупщиков',
		route: 'test',
		icon: <MdElectricalServices />,
		isDisabled: true
	},
	{
		title: 'Обновить характеристики',
		route: 'test1',
		icon: <MdAutoAwesomeMosaic />,
		isDisabled: true
	},
	{
		title: 'Перезаписать файл конфигурации',
		route: 'test2',
		icon: <MdFilterHdr />,
		isDisabled: true
	},
	{
		title: 'Обновление базы данных',
		route: 'test3',
		icon: <MdFilterBAndW />,
		isDisabled: true
	},
	{
		title: 'Составление кодировки',
		route: 'test4',
		icon: <MdExtension />,
		isDisabled: true
	},
	{
		title: 'Краны и металлорукава',
		route: 'test5',
		icon: <FaTape />,
		isDisabled: true
	},
	{
		title: 'Паспорта для таможни',
		route: 'test6',
		icon: <RiPassportFill />,
		isDisabled: true
	},
	{
		title: 'Обновить таблицу опций',
		route: 'test7',
		icon: <MdFactory />,
		isDisabled: true
	},
]