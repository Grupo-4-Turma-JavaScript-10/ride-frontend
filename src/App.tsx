import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { ToastContainer } from "react-toastify";
import PerfilPage from "./pages/perfil/PerfilPage";
import Sobre from "./pages/sobre/Sobre";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import Dashboard from "./pages/dashboard/Dashboard";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import Navbar from "./components/navbar/Navbar";



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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/produtos" element={<ListaProdutos/>} />
              <Route path="/cadastrarproduto" element={<FormProduto/>} />
              <Route path="/editarproduto/:id" element={<FormProduto/>} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto/>} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;