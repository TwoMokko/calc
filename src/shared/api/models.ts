
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
    options: options[]
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
    physicalCharacteristics?: physicalCharacteristics
}

export type productsTable = {
    soldProducts: soldProducts[],
    currentPage: number,
    availablePages: number
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
    types?: soldProducts[]
}

export interface productDataArticle {
    nameTable: string,
    historyPrices: {
        purchasePrice: number,
        datePrice: string,
        namePriceFor: string,
        quantity: number
    }[],
}

export type productData = {
    status?: number,
    rightArticul: string,
    type: string,
    title: string,
    priceInfo: {
        priceForClient: number,
        purchasePrice: number,
        coefficientForProductionAndDistribution: number,
        marginFactor: number,
        salesRatio: number,
        priceFrom: string
    },
    stockAvailability: string[][],
    buildArticul: productDataArticle,
    bodydArticul: productDataArticle,
    oneCString: string
}


export enum FilterOptionType {
    OPTION = 'options',
    CHARACTERISTIC = 'characters',
    CONNECTION_TYPE = 'connectionType',
    CONNECTION_SIZE = 'connectionSize',
    TYPE = 'type',
    TYPE_PRODUCT = 'productType',
}


export type languageData = {
    [key: string]: {
        title: string,
        icon: JSX.Element,
        default?: string,
        type?: FilterOptionType,
        index?: number,
    }
}

export type sidebarLink = {
    title: string,
    route: string,
    icon: JSX.Element
}
