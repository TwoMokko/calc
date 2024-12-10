import { Outlet } from "react-router-dom";
import { Sidebar } from "../../widgets/Sidebar/ui/Sidebar.tsx";
import {SearchContextProvider} from "../../shared/hooks/useSearchController.tsx";


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