import { Outlet } from "react-router-dom";
import { Sidebar } from "../../widgets/Sidebar/ui/Sidebar.tsx";
import { SearchContextProvider } from "../../shared/hooks/useSearchController.tsx";


export const Layout = () => {

    return <>
        <Sidebar></Sidebar>
        <div className='padding-bottom'>
            <main>
                <SearchContextProvider>
                    <Outlet/>
                </SearchContextProvider>
            </main>
        </div>
    </>

}