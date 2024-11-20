import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav.tsx";


export default function Layout () {

    return <>
       <Nav></Nav>
        <main>
            <Outlet />
        </main>
    </>

}