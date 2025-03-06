import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";

import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto";
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import ListaProdutosSaudaveis from "./components/produtos/listaprodutos/ListaProdutosSaudaveis";
import FormProdutos from "./components/produtos/formprodutos/FormProdutos";


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />

          <div className="scroll-smooth antialiased min-h-[80vh]">
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                
                <Route path="/produto/:id" element={<DeletarProduto />} />
                <Route path="/produtos" element={<ListaProdutos />} />
                <Route
                  path="/produtos/healthy"
                  element={<ListaProdutosSaudaveis />}
                />
                <Route path="/cadastrarproduto" element={<FormProdutos />} />
                <Route path="/atualizarproduto/:id" element={<FormProdutos />} />
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
