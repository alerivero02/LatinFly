import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
// import { LoginPage } from "./LoginPage";
import {Layout} from "./Layout"
import { VuelosPage } from "./VuelosPage";
import { PasajerosPage } from "./PasajerosPage";




function App() {
  return (
    <>
      <h1>LatinFly</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/homepage" element={<HomePage />} />
        </Route>
        <Route path="/vuelos" element={<VuelosPage/>}/>
        <Route path="/PasajerosPage" element={<PasajerosPage/>}/>
      </Routes>
    </>
  );
}

export default App;

