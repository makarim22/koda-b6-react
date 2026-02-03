import {
  BrowserRouter as Router,
  Routes,
  Route
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
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminProduct from "./pages/AdminProduct";
import AdminInsertProduct from "./pages/AdminInsertProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrder from "./pages/AdminOrder";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import ListUsers from "./pages/ListUsers";
import InsertUser from "./pages/InsertUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        /// user
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/product" element={<ProductPage />} />
         <Route path="/product-review" element={<ProductReview />} />
        <Route path="/product-review/:productId" element={<ProductReview />} />
        <Route path="/product-checkout" element={<ProductCheckout />} />
        <Route path="/order-history" element={<HistoryOrder/>} />
        <Route path="/detail-order" element={<DetailOrder />} />
        <Route path="/profile" element={<Profile />} />

        /// admin
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-product" element={<AdminProduct />} />
        <Route path="/admin-insert-product" element={<AdminInsertProduct />} />
        <Route path="/admin-edit-product" element={<AdminEditProduct />} />
        <Route path="/orders" element={<AdminOrder />} />
        <Route path="/orders-detail" element={< AdminOrderDetail />} />

        <Route path="/list-user" element={<ListUsers />} />
        <Route path="/insert-user" element={<InsertUser />} />
        <Route path="/edit-user" element={<EditUser />} />

      </Routes>
    </Router>
  );
}

export default App;
