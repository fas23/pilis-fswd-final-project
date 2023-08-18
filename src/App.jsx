import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation";
/* import Login from "./routes/Login/Login"; */
import Home from "./routes/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          {/* <Route path='login' element={<Login/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;