import {useEffect, useState} from "react";
import {TableProd} from "../components/Product/TableProd.tsx";
import {useParams} from "react-router-dom";
import {getDataForProduct} from "../api/Fetches.tsx";
import {productData} from "../types/Types.tsx";
import {Breadcrumbs} from "../components/Breadcrumbs.tsx";
import {MdCalculate} from "react-icons/md";
import {String} from "../components/Product/String.tsx";
import {CgClose} from "react-icons/cg";
import {PiEqualsBold} from "react-icons/pi";


export function ProductPage(): JSX.Element {
    const [data, setData] = useState<productData | undefined>()
    const {article} = useParams()

    function stockString(data: productData): string {
        let str = ''
        data.stockAvailability.map((tr: string[]) => {
            str += tr[0] + ' ' + tr[1] + ' шт \r\n'
        })
        return str
    }

    if (!article)
        return <div className='not-found'>Нету</div>

    useEffect(() => {
        (async () => {
            setData(await getDataForProduct(article))
        })()
    }, [])

    if (!data)
        return <div className='loading'>
            <div></div>
            <div>Загрузка</div>
        </div>

    if (data.status == 404)
        return <div>
            <h1>error 404</h1>
            <h4>ничего не найдено</h4>
        </div>

    return <>
        <Breadcrumbs
            links={[
                {route: '/', text: 'Поиск по характеристикам'},
                {route: `/prod/${data.rightArticul}`, text: `${data.rightArticul}`},
            ]}
        />
        <div className='calc-top'>
            <h1>
                <MdCalculate/>
                {data.rightArticul}
            </h1>
        </div>

        <section
            className='product-info block-prod section'
        >
            <h2>Характеристики</h2>
            <String head='Артикул' string={data.rightArticul}/>
            <String head='Полное наименование' string={data.title}/>
            <String head='Строка для 1С' string={data.oneCString}/>
            <String head='Наличие на складе' string={stockString(data)} className='stock'/>
            <String head='Данные о цене'
                    string={`${data.priceInfo.priceForClient}${data.priceInfo.priceFrom ? ` (${data.priceInfo.priceFrom})` : ''}`}/>

            <div className='product-price-calculator'>
                <h4>Расчет стоимости</h4>
                <div>
                    {/*TODO:оптимизировать*/}
                    <div>
                        <h3>{data.priceInfo.purchasePrice}</h3>
                        <div>Закупочная цена</div>
                    </div>
                    <div className='sign'>
                        <CgClose/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.coefficientForProductionAndDistribution}</h3>
                        <div>Закупочная цена</div>
                    </div>
                    <div className='sign'>
                        <CgClose/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.marginFactor}</h3>
                        <div>Закупочная цена</div>
                    </div>
                    <div className='sign'>
                        <CgClose/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.salesRatio}</h3>
                        <div>Закупочная цена</div>
                    </div>
                    <div className='sign'>
                        <PiEqualsBold/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.priceForClient}</h3>
                        <div>Закупочная цена</div>
                    </div>
                </div>
            </div>
        </section>

        {data.buildArticul && data.buildArticul.historyPrices.length > 0 &&
            <section className='block-prod section'>
                <h2>История изменения цен</h2>
                <h3>{data.buildArticul.nameTable}</h3>
                <div className='product-history-price-wrap'>
                    <TableProd
                        data={data.buildArticul}
                        className='table'
                    />
                </div>
            </section>
        }

        {data.bodydArticul && data.bodydArticul.historyPrices.length > 0 &&
            <section className='section'>
                <h2>История изменения цен</h2>
                <h3>{data.bodydArticul.nameTable}</h3>
                <div className='product-history-price-wrap'>
                    <TableProd
                        data={data.bodydArticul}
                        className='table'
                    />
                </div>
            </section>
        }
    </>
}
