import {useEffect, useState} from "react";
import {Button} from "../components/Button.tsx";
import {TableProd} from "../components/Product/TableProd.tsx";
import {useParams} from "react-router-dom";
import {getDataForProduct} from "../api/Fetches.tsx";
import {productData} from "../types/Types.tsx";


export function ProductPage(): JSX.Element {
    const [data, setData] = useState<productData | undefined>()
    const [titleBtn, setTitleBtn] = useState<string>('копировать')
    const {article} = useParams()

    if (!article)
        return <div className='not-found'>Нету</div>

    useEffect(() => {
        (async () => {
            setData(await getDataForProduct(article))
        })()
    }, [])


    function copyString(): void {
        const string = data?.oneCString

        if (string) {
            navigator.clipboard.writeText(string)
                .then(() => {
                    if (titleBtn !== 'скопировано') {
                        setTitleBtn('скопировано')
                        setTimeout(() => {
                            setTitleBtn('копировать')
                        }, 1500);
                    }
                })
                .catch(err => {
                    console.log('ошибка', err);
                })
        }
    }

    if (!data)
        return <div className='loading'>Загрузка</div>

    return <>
        <section
            className='product-info block-prod'
        >
            <div>
                <h4>Артикул: </h4>
                <div>{data.rightArticul}</div>
            </div>
            <div>
                <h4>Полное наименование: </h4>
                <div>{data.title}</div>
            </div>
            <div className='one-c'>
                <h4>Строка для 1С: </h4>
                <div>{data.oneCString}</div>
                <Button
                    title={titleBtn}
                    onClick={copyString}
                />
            </div>
        </section>

        <section
            className='product-presence block-prod'
        >
            <h2>Наличие на складе</h2>
            {
                data.stockAvailability.length &&
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Артикул</th>
                        <th>Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.stockAvailability.map((tr: string[], trId: number) => {
                            return <tr key={trId}>
                                {tr.map((td: string, tdId: number) => {
                                    return <td key={tdId}>{td}</td>
                                })}
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            }
        </section>

        <section
            className='block-prod'
        >
            <h2>Данные о цене</h2>
            <div
                className='product-price-client'
            >
                <h4>Стоимость для клиена: </h4>
                <div>{data.priceInfo.priceForClient}</div>
                <div>{data.priceInfo.priceFrom}</div>
            </div>
            <div
                className='product-price-calculator'
            >
                <h4>Расчет стоимости</h4>
                <div>
                    {/*TODO:оптимизировать*/}
                    <div>
                        <div>Закупочная цена</div>
                        <h4>{data.priceInfo.purchasePrice}</h4>
                    </div>
                    <h4 className='sign'>X</h4>
                    <div>
                        <div>Закупочная цена</div>
                        <h4>{data.priceInfo.coefficientForProductionAndDistribution}</h4>
                    </div>
                    <h4 className='sign'>X</h4>
                    <div>
                        <div>Закупочная цена</div>
                        <h4>{data.priceInfo.marginFactor}</h4>
                    </div>
                    <h4 className='sign'>X</h4>
                    <div>
                        <div>Закупочная цена</div>
                        <h4>{data.priceInfo.salesRatio}</h4>
                    </div>
                    <h4 className='sign'>=</h4>
                    <div>
                        <div>Закупочная цена</div>
                        <h4>{data.priceInfo.priceForClient}</h4>
                    </div>
                </div>

                <h4>История изменения цен</h4>
                <div className='product-history-price-wrap'>
                    {data.buildArticul && <TableProd
                        data={data.buildArticul}
                        className='table'
                    />}
                    {data.bodydArticul && <TableProd
                        data={data.bodydArticul}
                        className='table'
                    />}
                </div>
            </div>
        </section>
    </>
}
