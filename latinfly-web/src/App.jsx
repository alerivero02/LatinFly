import {  Route, Routes } from "react-router-dom";
import { VuelosPage } from "./VuelosPage";
import {PasajerosPage} from "./PasajerosPage";
import { AvionesPage } from "./AvionesPage";
import {LayoutPage} from "./LayoutPage"
import { LoginPage } from "./LoginPage";







function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage/>}>
          <Route index element={<LoginPage/>}/>
          <Route path="/vuelos"element={<VuelosPage />}/>
          <Route path="/pasajeros" element={<PasajerosPage/>}/>
          <Route path="/aviones" element={<AvionesPage/>}/>
        </Route>
        
          
      </Routes>
    </>
  );
}

export default App;

