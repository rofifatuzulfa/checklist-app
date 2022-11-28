import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
