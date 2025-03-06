import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import ListaCategorias from "./components/categorias/listarcategorias/ListarCategorias";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          {/* <Navbar /> */}
          <div className="scroll-smooth antialiased min-h-[80vh] bg-[var(--color-beige-500)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
