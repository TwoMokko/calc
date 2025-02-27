import { ReactNode } from "react";

export type languageData = {
	[key: string]: {
		title: string,
		icon: ReactNode,
		default?: string,
		type?: FilterOptionType,
		index?: number,
	}
}

export enum FilterOptionType {
	OPTION = 'options',
	CHARACTERISTIC = 'characters',
	CONNECTION_TYPE = 'connectionType',
	CONNECTION_SIZE = 'connectionSize',
	TYPE = 'type',
	TYPE_PRODUCT = 'productType',
	GEOMETRIC_CONFIG = 'geometricConfig'
}


export type TreeDataNodes = TreeDataNode[]
export interface TreeDataNode {
	title: string,
	key: string,
	childs?: TreeDataNodeChild[]
}

export interface TreeDataNodeChild {
	title: string,
	key: string
}

export interface connections {
	connectionNo: number,
	connectionTypes: string[],
	connectionSizes: string[]
}

export interface connection {
	connectionNo?: number,
	connectionType?: string,
	connectionSize?: string
}
export interface options {
	key: string,
	value: string[]
}

export type optionsData = {
	productType: string[],
	type: string[],
	connections: connections[],
	options: options[],
	geometricConfigs: string[],
}

export interface physicalCharacteristics {
	minTemperature?: number,
	// minPressure?: number,
	cv?: number,
	pressure?: number,
	bodyPressure?: number,
	maxTemperature?: number,
	// maxPressure?: number,
	dn?: number,
}

export type sendData = {
	productType?: string[],
	type?: string[],
	connections?: connection[],
	options?: {
		key: string,
		value: string,
	}[],
	physicalCharacteristics?: physicalCharacteristics,
	geometricConfig?: string
}

export type productsTable = {
	soldProducts: soldProducts[],
	currentPage: number,
	availablePages: number
}

interface geometricConfig {
	title: string,
	path: string
}

export interface soldProducts {
	vendorCode: string,
	price: number | null,
	rating: number | null,
	typeRating: number | null,
	purchasedQuantity: number | null,
	numberOfOrders: number | null,
	maxTemperature: number | null,
	minTemperature: number | null,
	workingPressure: number | null,
	quantityInStock: number | null,
	totalQuantity: number | null,
	connectionInfo: string,
	cv: number | null,
	dn: number | null,
	geometricConfig: string,
	geometricConfigNew: geometricConfig,
	types?: soldProducts[]
}