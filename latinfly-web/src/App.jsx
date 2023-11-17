import {  Route, Routes } from "react-router-dom";
import { VuelosPage } from "./VuelosPage";




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={< LoginPage/>}>
          <Route path="/homepage" element={<HomePage />} />
          
        </Route>
        <Route path="/vuelos" element={<VuelosPage/>}/>
      </Routes>
    </>
  );
}

export default App;

