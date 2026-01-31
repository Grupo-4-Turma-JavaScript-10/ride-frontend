import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
                        <Route path='/home' element={<Home />} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;