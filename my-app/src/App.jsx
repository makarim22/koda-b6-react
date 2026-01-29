

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ChatPage from "./pages/ChatPage";
import ProductReview from "./pages/ProductReview";
import HistoryOrder from "./pages/HistoryOrder";
import DetailOrder from "./pages/DetailOrder";
import ProductCheckout from "./pages/ProductCheckout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product-review" element={<ProductReview />} />
        <Route path="/product-checkout" element={<ProductCheckout />} />
        <Route path="/order-history" element={<HistoryOrder/>} />
        <Route path="/detail-order" element={<DetailOrder />} />

      </Routes>
    </Router>
  );
}

export default App;
