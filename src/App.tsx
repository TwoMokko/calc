
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CalcPage} from "./routes/CalcPage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route index element={<CalcPage />} />
              <Route path={'/test'} element={<>test</>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
