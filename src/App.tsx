import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { ToastContainer } from "react-toastify";
import PerfilPage from "./pages/perfil/PerfilPage";
import Sobre from "./pages/sobre/Sobre";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";


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
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria/>} />
              <Route path="/editarcategoria/:id" element={<FormCategoria/>} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria/>} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;