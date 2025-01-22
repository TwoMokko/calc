import { Outlet } from "react-router-dom";
import { Sidebar } from "../../widgets/Sidebar/ui/Sidebar.tsx";
import { SearchContextProvider } from "../../shared/hooks/useSearchController.tsx";


export const Layout = () => {

    return <>
        <Sidebar></Sidebar>
        <main>
            <SearchContextProvider>
                <Outlet />
            </SearchContextProvider>
        </main>
    </>

}