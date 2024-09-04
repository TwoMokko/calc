
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CalcPage} from "./routes/CalcPage.tsx";
import {ProductPage} from "./routes/ProductPage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route index element={<CalcPage />} />
              <Route path='/prod?/:article' element={<ProductPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
