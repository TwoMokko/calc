import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalcPage } from "../pages/calculator/ui/CalcPage.tsx";
import { ProductPage } from "../pages/product/ui/ProductPage.tsx";
import { Test } from "../pages/test/Test.tsx";
import { Layout } from "./layouts/Layout.tsx";
import { ModelsPage } from "../pages/models/ui/ModelsPage.tsx";
// import {PassportPage} from "../pages/passport/ui/PassportPage.tsx";

function Routers() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />} >
                        <Route index element={<CalcPage />}/>
                        <Route path='/prod?/:article' element={<ProductPage />}/>
                        <Route path='/models' element={<ModelsPage />}/>
                        {/*<Route path='/passport' element={<PassportPage />}/>*/}
                        <Route path='/test' element={<Test />}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routers
