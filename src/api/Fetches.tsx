import { optionsData, productData, productsTable, sendData, TreeDataNodes } from "../types/Types.tsx";

/** Domains */
enum domains {
    FILTER = 'http://192.168.1.202:31939',
    PRODUCT = 'http://192.168.1.202:31476'
}


/** Запросы на странице с фильтром */
/* Запрос на получение данных для отрисовки DOM (?fetchDataFirst) */
export const fetchData = async (): Promise<optionsData> => {
    return await fetch(`${domains.FILTER}/products/options?fetchDataFirst`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

/* Запрос на получение данных для перерисовки DOM */
export const sendDataForOptions = (filter: sendData, highlight: Function) => {
    fetch(`${domains.FILTER}/products/options`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(filter),

    })
        .then(async response => {
            const result = await response.json()
            highlight(result)
        })
}

/* Запрос на получение данных для отрисовки select tree,
inputValue - это строка, которую вводит пользователь в input Типа продукции,
 далее обновляется дерево выпадающего списка */
export const getTypeProducts = async (inputValue: string): Promise<TreeDataNodes> => {
    return await fetch(`${domains.FILTER}/products/types${inputValue ? '?query=' + inputValue : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
}

/* Запрос на получение данных для отрисовки и перерисовки таблицы */
export const sendDataForProductTable = async (filter: sendData, currentPage: number, sizePage: number, sortState: string, controller: AbortController): Promise<productsTable> => {
    return await fetch(`${domains.FILTER}/products/sold?PageId=${currentPage}&PageSize=${sizePage}&State=${sortState}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(filter),
        signal: controller.signal
    })
        .then(async response => {
            return await response.json()
        })
}


/** Запросы на странице с одним товаром продукции */
/* Запрос на получение данных для отрисовки страницы товара продукции по артикулу */
export const getDataForProduct = async (string: string): Promise<productData> => {
    return await fetch(`${domains.PRODUCT}/api/Specification/${string}`)
        .then(async response => {
            return await response.json()
        })
}