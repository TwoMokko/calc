import { useEffect, useState } from "react";
import { TableProd } from "./TableProd.tsx";
import { useParams } from "react-router-dom";
import { productData } from "../../../shared/api/models.ts";
import { Breadcrumbs } from "../../../shared/ui/Breadcrumbs.tsx";
import { MdCalculate } from "react-icons/md";
import { String } from "../../../shared/ui/String.tsx";
import { CgClose } from "react-icons/cg";
import { PiEqualsBold } from "react-icons/pi";
import { Error } from "../../../widgets/PageError/ui/Error.tsx";
import {getDataForProduct} from "../api/fetches.ts";


export function ProductPage(): JSX.Element {
    /** Constants */
    const [data, setData] = useState<productData | undefined>()         // Данные, получаемые из запроса по артикулу
    const {article} = useParams()                                       // Артикль продукции, из адресной строки


    /** Constants (functions) */
    // /* Формирование строки для поля (Наличие на складе), составляется из массива stockAvailability */
    // const getStockString = (data: productData): string => {
    //     let str = ''
    //     data.stockAvailability.map((tr: string[]) => {
    //         str += tr[0] + ' ' + tr[1] + ' шт \r\n'
    //     })
    //     return str
    // }

    /* Если в адресной строке нет параметра article */
    if (!article)
        return <div className='not-found'>Нету</div>


    /** UseEffects */
    useEffect(() => {
        // Запрос при инициализации компонента, получение и установка данных для отрисовки страницы
        (async () => {
            setData(await getDataForProduct(article))
        })()
    }, [])


    /** Build DOM */
    /* Проверка, пришли ли данные для отрисовки DOM  */
    if (!data)
        return <div className='loading'>
            <div></div>
            <div>Загрузка</div>
        </div>

    /* Если ответ приходит со статусом ошибки 404, то отрисовать компонент Error  */
    if (data.status == 404)
        return <Error />

    /* Отрисовка DOM */
    return <>
        <div className='calc-top-wrap'>
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
        </div>

        <section className='product-info block-prod section'>
            <h2>Характеристики</h2>
            <String head='Артикул' string={data.rightArticul}/>
            <String head='Полное наименование' string={data.title}/>
            <String head='Строка для 1С' string={data.oneCString}/>
            {/*<String head='Наличие на складе' string={getStockString(data)} className='stock'/>*/}
            <String head='Данные о цене' string={`${data.priceInfo.priceForClient}${data.priceInfo.priceFrom ? ` (${data.priceInfo.priceFrom})` : ''}`}/>

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
                        <div>Коэффициент транспортных расходов</div>
                    </div>
                    <div className='sign'>
                        <CgClose/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.marginFactor}</h3>
                        <div>Коэффициент наценки</div>
                    </div>
                    <div className='sign'>
                        <CgClose/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.salesRatio}</h3>
                        <div>Коэффициент продаж</div>
                    </div>
                    <div className='sign'>
                        <PiEqualsBold/>
                    </div>
                    <div>
                        <h3>{data.priceInfo.priceForClient}</h3>
                        <div>Стоимость для клиента</div>
                    </div>
                </div>
            </div>
        </section>

        {data.stockAvailability &&
            <section className='section'>
                <h2>Наличие на складе</h2>
                {/*<h3>{data.stockAvailability.nameTable}</h3>*/}
                <h3>Название таблицы</h3>
                <div className='product-history-price-wrap'>
                    <TableProd
                        data={[{'1': '1', '2': 2,'3': '3', '4': 4, '5': '5'}, {'1': '1', '2': 2,'3': '3', '4': 4, '5': '5'}]}
                        className='table'
                        columnsHead={['Артикул', 'Место хранения', 'Общее количество', 'Отложено', 'Остатки на складе']}
                    />
                </div>
            </section>
        }

        {data.buildArticul && data.buildArticul.historyPrices.length > 0 &&
            <section className='block-prod section'>
                <h2>История изменения цен</h2>
                <h3>{data.buildArticul.nameTable}</h3>
                <div className='product-history-price-wrap'>
                    <TableProd
                        data={Object.values(data.buildArticul.historyPrices)}
                        className='table'
                        columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
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
                        data={Object.values(data.bodydArticul.historyPrices)}
                        className='table'
                        columnsHead={['Цена закупки', 'Дата', 'Источник', 'Количество']}
                    />
                </div>
            </section>
        }
    </>
}
