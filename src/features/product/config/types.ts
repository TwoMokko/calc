export interface tableHistoryPrices {
	nameTable: string,
	historyPrices: {
		purchasePrice: number,
		datePrice: string,
		namePriceFor: string,
		quantity: number
	}[],
}

export interface stockAvailability {
	name: string,
	storageLocation: string,
	quantityOnShelf: number,
	postponedQuantity: number,
	freeQuantity: number,
	expectedAdmission: number,
	allQuantity: number,
}

export type productData = {
	Characteristics: { [key: string]: string },
	Materials: {},
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
	stockAvailability: stockAvailability[],
	tableHistoryPrices: tableHistoryPrices[],
	oneCString: string
}

export type similarProductData = {
	vendorCode: string,
	img: string,
	properties: { name: string, value: string }[]
}
