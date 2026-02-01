import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

import { ToastContainer } from "react-toastify";
import Sobre from "./pages/sobre/Sobre";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <Navbar/>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />

          </Routes>
        </main>

        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;