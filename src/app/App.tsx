import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalcPage } from "../pages/calculator/ui/CalcPage.tsx";
import { ProductPage } from "../pages/product/ui/ProductPage.tsx";
import { Test } from "../pages/test/Test.tsx";
import Layout from "./layouts/Layout.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />} >
                        <Route index element={<CalcPage/>}/>
                        <Route path='/prod?/:article' element={<ProductPage/>}/>
                        <Route path='/test' element={<Test/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
