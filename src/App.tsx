import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import Sobre from "./pages/sobre/Sobre";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto";
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import ListaProdutosSaudaveis from "./components/produtos/listaprodutos/ListaProdutosSaudaveis";
import FormProdutos from "./components/produtos/formprodutos/FormProdutos";
import ListaCategorias from "./components/categorias/listarcategorias/ListarCategorias";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria";
import ListaProdutosCategorias from "./components/produtos/listaprodutos/ListaProdutosCategorias";
import Cadastro from "./pages/cadastro/Cadastro";
import Cart from "./components/carrinho/Cart";
import { CartProvider } from "./contexts/CartContext";
import ListarProdutosPorNome from "./components/produtos/listarprodutospornome/ListarProdutosPorNome";

function App() {
    return (
        <>
            <CartProvider>
                <AuthProvider>
                    <ToastContainer />
                    <BrowserRouter>
                        <Navbar />
                        <div className="scroll-smooth antialiased min-h-[80vh]">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/cadastro"
                                    element={<Cadastro />}
                                />
                                <Route path="/perfil" element={<Perfil />} />
                                <Route path="/sobre" element={<Sobre />} />
                                <Route
                                    path="/categorias/nome/:nome_categoria"
                                    element={<ListaProdutosCategorias />}
                                />
                                <Route
                                    path="/categorias"
                                    element={<ListaCategorias />}
                                />
                                <Route
                                    path="/cadastrarcategoria"
                                    element={<FormCategoria />}
                                />
                                <Route
                                    path="/editarcategoria/:id"
                                    element={<FormCategoria />}
                                />
                                <Route
                                    path="/deletarcategoria/:id"
                                    element={<DeletarCategoria />}
                                />
                                <Route
                                    path="/produtos"
                                    element={<ListaProdutos />}
                                />
                                <Route
                                    path="/produto/:id"
                                    element={<DeletarProduto />}
                                />
                                <Route
                                    path="/produtos/healthy"
                                    element={<ListaProdutosSaudaveis />}
                                />
                                <Route
                                    path="/cadastrarproduto"
                                    element={<FormProdutos />}
                                />
                                <Route
                                    path="/atualizarproduto/:id"
                                    element={<FormProdutos />}
                                />
                                <Route path="/cart" element={<Cart />} 
                                />
                                <Route
                                    path="/produtos/nome/:nome"
                                    element={<ListarProdutosPorNome />}
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </BrowserRouter>
                </AuthProvider>
            </CartProvider>
        </>
    );
}

export default App;
