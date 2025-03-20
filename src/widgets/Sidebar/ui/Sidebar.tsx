import { NavLink } from "react-router-dom";
import { ReactNode, useState } from "react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { ruSidebarLinks } from "../../../app/config/sidebar";

const Sidebar = (): ReactNode => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {
            ruSidebarLinks.map(link => { if (!link.isDisabled)
                return <NavLink
                    key={link.route}
                    title={link.title} // TODO: сделать ховер только, когда сайдбар сложен
                    to={`/${link.route}`}
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    {link.icon}
                    <div className='sidebar-text'>{link.title}</div>
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