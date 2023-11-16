import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { VuelosPage } from "./VuelosPage";




function App() {
  return (
    <>
      <nav><h1>LatinFly</h1></nav>
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

