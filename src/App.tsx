import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // ADICIONE ESTA LINHA
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { ToastContainer } from "react-toastify";
import PerfilPage from "./pages/perfil/PerfilPage";
import Sobre from "./pages/sobre/Sobre";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          <main className="min-h-screen flex flex-col">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/sobre" element={<Sobre />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;