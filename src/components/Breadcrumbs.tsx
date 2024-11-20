import { FC } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
    links: { [key: string]: string }[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({links}): JSX.Element => {
    return <div className='breadcrumbs'>
        {
            links.map(elem => {
                return <Link key={elem.route} to={elem.route}>{elem.text}</Link>
            })
        }
    </div>
}