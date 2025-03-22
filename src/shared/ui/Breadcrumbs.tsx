import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
    links: { [key: string]: string }[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({links}): ReactNode => {
    return <div className='breadcrumbs'>
        {
            links.map(elem => {
                return <Link key={elem.route} to={elem.route}>{elem.text}</Link>
            })
        }
    </div>
}

export default Breadcrumbs
