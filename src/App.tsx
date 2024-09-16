import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CalcPage} from "./routes/CalcPage.tsx";
import {ProductPage} from "./routes/ProductPage.tsx";
import {Test} from "./routes/Test.tsx";
import Layout from "./routes/Layout.tsx";

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
