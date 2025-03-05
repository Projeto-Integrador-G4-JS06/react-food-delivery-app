import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormProdutos from "./components/produtos/formprodutos/FormProdutos"
import Home from './pages/home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrarproduto" element={<FormProdutos />} />
          <Route path="/editarproduto/:id" element={<FormProdutos />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
