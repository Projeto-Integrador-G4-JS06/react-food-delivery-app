import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Cadastro from './pages/cadastro/Cadastro'
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/login/Login";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col">
            <Navbar />
          </div>

          <div className="flex flex-col min-h-[80vh] bg-gray-200 ">
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/usuarios/cadastrar" element={<Cadastro />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
