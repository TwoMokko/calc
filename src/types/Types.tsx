
export type TreeDataNodes = TreeDataNode[]
// TODO: key string or number
export interface TreeDataNode {
    title: string,
    key: string,
    children?: TreeDataNodeChild[]
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
    // typeProd: typeProd[],
    type: string[],
    connections: connections[],
    options: options[]
}

export interface physicalCharacteristics {
    minTemperature?: number,
    minPressure?: number,
    cv?: number,
    bodyPressure?: number,
    maxTemperature?: number,
    maxPressure?: number,
    dn?: number,
}

export type sendData = {
    // typeProd?: typeProd[],
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

