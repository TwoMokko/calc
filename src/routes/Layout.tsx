import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar.tsx";
import {SearchContextProvider} from "../hooks/useSearchController.tsx";


export default function Layout () {

    return <>
       <Sidebar></Sidebar>
        <SearchContextProvider>
            <main>
                <Outlet />
            </main>
       </SearchContextProvider>
    </>

}