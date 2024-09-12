import {NavLink} from "react-router-dom";
import {
    MdAutoAwesomeMosaic,
    MdCalculate,
    MdElectricalServices, MdExtension,
    MdFactory,
    MdFilterBAndW,
    MdFilterHdr
} from "react-icons/md";
import {RiPassportFill} from "react-icons/ri";
import {FaTape} from "react-icons/fa";

const links = [
    {
        title: 'Поиск по характеристикам',
        route: '',
        icon: <MdCalculate />
    },
    {
        title: 'Форма закупщиков',
        route: 'test',
        icon: <MdElectricalServices />
    },
    {
        title: 'Обновить характеристики',
        route: 'test1',
        icon: <MdAutoAwesomeMosaic />
    },
    {
        title: 'Перезаписать файл конфигурации',
        route: 'test2',
        icon: <MdFilterHdr />
    },
    {
        title: 'Обновление базы данных',
        route: 'test3',
        icon: <MdFilterBAndW />
    },
    {
        title: 'Составление кодировки',
        route: 'test4',
        icon: <MdExtension />
    },
    {
        title: 'Краны и металлорукава',
        route: 'test5',
        icon: <FaTape />
    },
    {
        title: 'Паспорта для таможни',
        route: 'test6',
        icon: <RiPassportFill />
    },
    {
        title: 'Обновить таблицу опций',
        route: 'test7',
        icon: <MdFactory />
    },
]

export function Nav(): JSX.Element {

    return <nav className='nav-main'>
        {
            links.map(elem => {
                return <NavLink
                    key={elem.title}
                    to={`/${elem.route}`}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    {elem.icon}
                    <div>{elem.title}</div>
                </NavLink>
            })
        }
    </nav>
}