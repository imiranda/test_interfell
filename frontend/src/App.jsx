import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DepositPage from "./pages/DepositPage";
import PurchasePage from "./pages/PurchasePage";
import ConfirmPage from "./pages/ConfirmPage";
import BalancePage from "./pages/BalancePage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-white shadow-md border-b border-gray-200">
          <nav className="flex justify-center gap-4 p-4 text-sm font-medium">
            <Link to="/register" className="hover:underline">Registrar</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/deposit" className="hover:underline">Recargar</Link>
            <Link to="/purchase" className="hover:underline">Compra</Link>
            <Link to="/confirm" className="hover:underline">Confirmar</Link>
            <Link to="/balance" className="hover:underline">Saldo</Link>
          </nav>
        </div>

        <div className="p-6 max-w-xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/balance" element={<BalancePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
