import {Link} from "react-router-dom";

export function Breadcrumbs({links}: {links: { [key: string]: string }[]}): JSX.Element {
    return <div className='breadcrumbs'>
        {
            links.map(elem => {
                return <Link key={elem.route} to={elem.route}>{elem.text}</Link>
            })
        }
    </div>
}