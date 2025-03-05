import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Footer from './components/footer/Footer'
// import Navbar from './components/navbar/Navbar'
// import Home from './pages/home/Home'
import ListaCategorias from './components/categorias/listarcategorias/ListarCategorias'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormCategoria from './components/categorias/formcategoria/FormCategoria'
import DeletarCategoria from './components/categorias/deletarcategoria/DeletarCategoria'
// import ListarProdutos from './components/produtos/listarprodutos/ListarProdutos'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="scroll-smooth antialiased min-h-[80vh]  bg-slate-100">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> */}
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            {/* <Route path="/produtos" element={<ListarProdutos />} /> */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App