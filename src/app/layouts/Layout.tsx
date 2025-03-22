import { Outlet } from "react-router-dom";
import { SearchContextProvider } from "../../shared/hooks/useSearchController.tsx";
import Sidebar from "../../widgets/Sidebar/ui/Sidebar.tsx";


const Layout = () => {

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

export default Layout