import { NavLink } from "react-router-dom";
import { useState } from "react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { ruSidebarLinks } from "../data/Languages.tsx";

export const Sidebar = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {
            ruSidebarLinks.map(elem => {
                return <NavLink
                    key={elem.title}
                    title={elem.title} // TODO: сделать ховер только, когда сайдбар сложен
                    to={`/${elem.route}`}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
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