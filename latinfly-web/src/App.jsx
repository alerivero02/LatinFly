import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
// import { LoginPage } from "./LoginPage";
import {Layout} from "./Layout"
import { VuelosPage } from "./VuelosPage";




function App() {
  return (
    <>
      <h1>LatinFly</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/homepage" element={<HomePage />} />
          
        </Route>
        <Route path="/vuelos" element={<VuelosPage/>}/>
      </Routes>
    </>
  );
}

export default App;

