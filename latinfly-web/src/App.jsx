import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { VuelosPage } from "./VuelosPage";
import {PasajerosPage} from "./PasajerosPage"
import { BoletosPage } from "./BoletoPage";



function App() {
  return (
    <>
      <nav><h1>LatinFly</h1></nav>
      <Routes>
        <Route path="/" element={< LoginPage/>}>
          <Route path="/homepage" element={<HomePage />} />
        </Route>
        <Route path="/vuelos" element={<VuelosPage/>}/>
        <Route path="/pasajeros" element={<PasajerosPage/>}/>
        <Route path="/boletos" element={<BoletosPage/>}/>
      </Routes>
    </>
  );
}

export default App;

