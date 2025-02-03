interface dataForTableDownLoadModelsItem {
	vendorCode: string,
	freeQuantity: string,
	allQuantity: string,
	price: number | null
}

interface dataForTableDownLoadModelsError {
	id: number,
	vendorCode: string,
	message: string,
}

export type dataForTableDownLoadModels = {
	errors?: dataForTableDownLoadModelsError[] | null,
	data: dataForTableDownLoadModelsItem[]
}