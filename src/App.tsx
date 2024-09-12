import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CalcPage} from "./routes/CalcPage.tsx";
import {ProductPage} from "./routes/ProductPage.tsx";
import {Test} from "./routes/Test.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<CalcPage/>}/>
                    <Route path='/prod?/:article' element={<ProductPage/>}/>
                    <Route path='/test' element={<Test/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
