import {  Route, Routes } from "react-router-dom";
import { VuelosPage } from "./VuelosPage";
import {PasajerosPage} from "./PasajerosPage";
import { AvionesPage } from "./AvionesPage";
import {LayoutPage} from "./LayoutPage"
import { LoginPage } from "./LoginPage";
import { RequiredAuth } from "./RequireAuth";
import { BoletosPage } from "./BoletosPage";







function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage/>}>
          <Route index element={<LoginPage/>}/>
          <Route path="/vuelos"element={<RequiredAuth><VuelosPage /></RequiredAuth>}/>
          <Route path="/pasajeros" element={<RequiredAuth><PasajerosPage/></RequiredAuth>}/>
          <Route path="/boletos/:idVuelo" element={<RequiredAuth><BoletosPage/></RequiredAuth>}/>
          <Route path="/aviones" element={<AvionesPage/>}/>
        </Route>
        
          
      </Routes>
    </>
  );
}

export default App;

