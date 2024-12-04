import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav.tsx";
import {SearchContextProvider} from "../hooks/useSearchController.tsx";


export default function Layout () {

    return <>
       <Nav></Nav>
        <SearchContextProvider>
            <main>
                <Outlet />
            </main>
       </SearchContextProvider>
    </>

}