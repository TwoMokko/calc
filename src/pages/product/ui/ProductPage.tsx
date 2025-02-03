import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { productData, tableHistoryPrices } from "../config/types.ts";
import { Breadcrumbs } from "../../../shared/ui/Breadcrumbs.tsx";
import { MdCalculate } from "react-icons/md";
import { Error } from "../../../widgets/PageError/ui/Error.tsx";
import { getDataForProduct } from "../api/fetches.ts";
import { HistoryPriceSection } from "./sections/HistoryPriceSection.tsx";
import { StockAvailabilitySection } from "./sections/StockAvailabilitySection.tsx";
import { ModelSection } from "./sections/ModelSection.tsx";
import { GeneralInfoSection } from "./sections/GeneralInfoSection.tsx";
import { CharacteristicsSection } from "./sections/CharacteristicsSection.tsx";
import { MaterialsSection } from "./sections/MaterialsSection.tsx";
import {Loader} from "../../../widgets/Loader/Loader.tsx";


// const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export function ProductPage(): ReactNode {
    /** Constants */
    const [data, setData] = useState<productData | undefined>()         // Данные, получаемые из запроса по артикулу
    const {article} = useParams()                                       // Артикль продукции, из адресной строки

    let sections: tableHistoryPrices[] = []
    const [activeSection, setActiveSection] = useState<string>()

    /** Constants (functions) */
    // /* Формирование строки для поля (Наличие на складе), составляется из массива stockAvailability */
    // const getStockString = (data: productData): string => {
    //     let str = ''
    //     data.stockAvailability.map((tr: string[]) => {
    //         str += tr[0] + ' ' + tr[1] + ' шт \r\n'
    //     })
    //     return str
    // }


    // const renderContent = useMemo(() => {
    //     if (data && article)
    //         switch (activeSection) {
    //             case 'HistoryPriceSection':
    //                 return <HistoryPriceSection data={data} />
    //             // case 'StockAvailabilitySection':
    //             //     return <StockAvailabilitySection data={data} />
    //             default:
    //                 return <HistoryPriceSection data={data} />
    //         }
    // }, [activeSection, data])


    const renderContent = useMemo((): ReactNode => {
        if (data && article)
            sections = data.tableHistoryPrices
            return sections.map(section => {
                return (section.nameTable === activeSection)
                    ? <HistoryPriceSection key={section.nameTable} data={section.historyPrices}/>
                    : <div key={section.nameTable}></div>
            })
    }, [activeSection, data])


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

    useEffect(() => {
        setActiveSection(sections.length ? sections[0].nameTable : '')
    }, [data]);


    /** Build DOM */
    /* Проверка, пришли ли данные для отрисовки DOM  */
    if (!data)
        return <Loader />

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

        <GeneralInfoSection data={data} />
        <ModelSection vendorCode={article} />
        <CharacteristicsSection data={data.Characteristics} />
        <MaterialsSection data={data.Materials} />
        <StockAvailabilitySection data={data} />

        <div className='section'>
            <h2>История изменения цен</h2>
            <nav className='product-switch'>
                {
                    sections.map(section => <div
                        key={section.nameTable}
                        className={`product-switch-link ${section.nameTable == activeSection ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.nameTable)}
                    >
                        {section.nameTable}
                    </div>)
                }
            </nav>
            <div>
                {renderContent}
            </div>
        </div>



    </>
}
