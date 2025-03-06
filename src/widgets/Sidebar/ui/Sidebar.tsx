import { NavLink } from "react-router-dom";
import { ReactNode, useState } from "react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { ruSidebarLinks } from "../config/data.tsx";

const Sidebar = (): ReactNode => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {
            ruSidebarLinks.map(elem => {
                return <NavLink
                    key={elem.title}
                    title={elem.title} // TODO: сделать ховер только, когда сайдбар сложен
                    to={`/${elem.route}`}
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    {elem.icon}
                    <div className='sidebar-text'>{elem.title}</div>
                </NavLink>
            })
        }

        <button
            className='collapsed-btn'
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Показать sidebar' : 'Скрыть sidebar'}
        >
            {collapsed ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />}
        </button>
    </aside>
}

export default Sidebar