import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ChatPage from "./pages/ChatPage";
import ProductReview from "./pages/ProductReview";
import HistoryOrder from "./pages/HistoryOrder";
import DetailOrder from "./pages/DetailOrder";
import ProductCheckout from "./pages/ProductCheckout";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ListProducts from "./pages/ListProducts";
import ListOrders from "./pages/ListOrders";
import ListUsers from "./pages/ListUsers";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./utils/scrollRestoration";
import {CartProvider} from "./context/CartContext"
import { ProtectedRoute, AdminRoute } from "./component/ProtectedRoutes";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './features/user/authSlice'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-review"
            element={
              <ProtectedRoute>
                <ProductReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-review/:productId"
            element={
              <ProtectedRoute>
                <ProductReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-checkout/:productId"
            element={
              <ProtectedRoute>
                <ProductCheckout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-checkout"
            element={
              <ProtectedRoute>
                <ProductCheckout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <HistoryOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail-order/:id"
            element={
              <ProtectedRoute>
                <DetailOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <AdminRoute>
                <ListProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <AdminRoute>
                <ListOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <AdminRoute>
                <ListUsers />
              </AdminRoute>
            }
          />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
