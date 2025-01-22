import {sidebarLink} from "../../../app/types/types.ts";

import {
	MdAutoAwesomeMosaic,
	MdCalculate,
	MdElectricalServices,
	MdExtension, MdFactory,
	MdFilterBAndW,
	MdFilterHdr
} from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaTape } from "react-icons/fa";
import { RiPassportFill } from "react-icons/ri";

export const ruSidebarLinks: sidebarLink[] = [
	{
		title: 'Поиск по характеристикам',
		route: '',
		icon: <MdCalculate />
	},
	{
		title: 'Генерация тех паспортов',
		route: 'passport',
		icon: <AiFillSafetyCertificate />
	},
	{
		title: 'Форма закупщиков',
		route: 'test',
		icon: <MdElectricalServices />
	},
	{
		title: 'Обновить характеристики',
		route: 'test1',
		icon: <MdAutoAwesomeMosaic />
	},
	{
		title: 'Перезаписать файл конфигурации',
		route: 'test2',
		icon: <MdFilterHdr />
	},
	{
		title: 'Обновление базы данных',
		route: 'test3',
		icon: <MdFilterBAndW />
	},
	{
		title: 'Составление кодировки',
		route: 'test4',
		icon: <MdExtension />
	},
	{
		title: 'Краны и металлорукава',
		route: 'test5',
		icon: <FaTape />
	},
	{
		title: 'Паспорта для таможни',
		route: 'test6',
		icon: <RiPassportFill />
	},
	{
		title: 'Обновить таблицу опций',
		route: 'test7',
		icon: <MdFactory />
	},
]