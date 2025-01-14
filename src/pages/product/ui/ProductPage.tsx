import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { productData, productDataArticle } from "../../../app/types/types.ts";
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


// const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

// const sections = [
//     { title: 'История изменения цен', key: 'HistoryPriceSection' },
//     // { title: 'Наличие на складе', key: 'StockAvailabilitySection' },
// ]

export function ProductPage(): ReactNode {
    /** Constants */
    const [data, setData] = useState<productData | undefined>()         // Данные, получаемые из запроса по артикулу
    const {article} = useParams()                                       // Артикль продукции, из адресной строки

    const sections: { title: string, table: productDataArticle }[] = []
    if (data?.bodydArticul) sections.push({ title: data?.bodydArticul.nameTable, table: data?.bodydArticul })
    if (data?.buildArticul) sections.push({ title: data?.buildArticul.nameTable, table: data?.buildArticul })
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
            return sections.map(section => {
                return (section.table && section.title === activeSection)
                    ? <HistoryPriceSection key={section.title} data={section.table}/>
                    : <div key={section.title}></div>
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
        // if (data?.bodydArticul) sections.push({ title: data?.bodydArticul.nameTable, table: data?.bodydArticul })
        // if (data?.buildArticul) sections.push({ title: data?.buildArticul.nameTable, table: data?.buildArticul })

        setActiveSection(sections.length ? sections[0].title : '')
    }, [data]);

    useEffect(() => {
        console.log('act: ', activeSection)

    }, [activeSection]);

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
                        key={section.title}
                        className={`product-switch-link ${section.title == activeSection ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.title)}
                    >
                        {section.title}
                    </div>)
                }
            </nav>
            <div>
                {renderContent}
            </div>
        </div>



    </>
}
