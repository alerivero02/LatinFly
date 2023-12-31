import {  Route, Routes } from "react-router-dom";
import { VuelosPage } from "./VuelosPage";
import {PasajerosPage} from "./PasajerosPage";
import { AvionesPage } from "./AvionesPage";
import {LayoutPage} from "./LayoutPage"
import { LoginPage } from "./LoginPage";
import { RequiredAuth } from "./RequireAuth";
import { BoletosPage } from "./BoletosPage";
import { PasajePage } from "./PasajePage";
import { SinRuta } from "./SinRuta";
import {AgregarPasajero} from "./NuevoPasajeroPage";


function App() {
  

  return (  //Se indica como se utilizan las rutas en el navegador con sus componentes
    <>
      <Routes>
        <Route path="/" element={<LayoutPage/>}>
          <Route index element={<LoginPage/>}/>
          <Route path="/vuelos"element={<RequiredAuth><VuelosPage /></RequiredAuth>}/>
          <Route path="/pasajeros/:idBoleto" element={<RequiredAuth><PasajerosPage/></RequiredAuth>}/>
          <Route path="/boletos/:idVuelo" element={<RequiredAuth><BoletosPage/></RequiredAuth>}/>
          <Route path="/pasaje/:idBoleto/:idPasajero" element={<PasajePage/>}/>
          <Route path="/aviones" element={<AvionesPage/>}/>
          <Route path="*"element={<SinRuta/>}/>
          <Route path="/nuevo-pasajero" element={<RequiredAuth><AgregarPasajero/></RequiredAuth>}/>
        </Route>
        
          
      </Routes>
    </>
  );
}

export default App;

