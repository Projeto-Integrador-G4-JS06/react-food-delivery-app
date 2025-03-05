import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import DeletarCategoria from "./components/deletarpostagem/DeletarPostagem";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col">
          <Navbar />
        </div>

        <div className="flex flex-col min-h-[80vh] bg-gray-200 ">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/deletarcategoria" element={<DeletarCategoria />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
