import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import Cadastro from "./pages/cadastro/Cadastro";


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />

          <div className="flex flex-col min-h-[80vh] bg-[#F5F5DC] ">
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/produtos" element={<ListaProdutos />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;