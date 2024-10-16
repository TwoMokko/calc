import {optionsData, productData, productsTable, sendData, TreeDataNodes} from "../types/Types.tsx";

export async function fetchData(): Promise<optionsData> {
    return await fetch(`http://192.168.1.202:31939/products/options?fetchDataFirst`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

export function sendDataForOptions(filter: sendData, highlight: Function) {
    fetch(`http://192.168.1.202:31939/products/options`, {
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
export async function getTypeProducts(): Promise<TreeDataNodes> {
    return await fetch(`http://192.168.1.202:31939/products/types`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(res => res.json())
}

export async function sendDataForProductTable(filter: sendData, currentPage: number, sizePage: number, controller: AbortController): Promise<productsTable> {

    return await fetch(`http://192.168.1.202:31939/products/sold?PageId=${currentPage}&PageSize=${sizePage}`, {
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


export async function getDataForProduct(string: string): Promise<productData> {
    return await fetch(`http://192.168.1.202:31476/api/Specification/${string}`)
        .then(async response => {
            return await response.json()
        })
}