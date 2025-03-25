import { sendData } from "../../../features/calculator/model/types.ts";

/* Функция для проверки на пустоту объекта (и его внутренних элементов) */
const isEmpty = (val: unknown): boolean => {
	if (val === undefined || val === null) return true
	if (Array.isArray(val)) return val.length === 0
	if (typeof val === 'string') return val.trim() === ''
	if (typeof val === 'object') return Object.keys(val).length === 0
	return false
}

/* Проверка на пустоту конкретно фильтра */
export const isSendDataEmptyOptimized = (data: sendData): boolean => {
	const fields = [
		data.productType,
		data.type,
		data.connections,
		data.options,
		data.physicalCharacteristics,
		data.geometricConfig
	]

	return !fields.some(field => !isEmpty(field))
}