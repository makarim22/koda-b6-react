import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import OAuthCallback from "./pages/OAuthCallback";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ChatPage from "./pages/ChatPage";
import ProductReview from "./pages/ProductReview";
import HistoryOrder from "./pages/HistoryOrder";
import DetailOrder from "./pages/DetailOrder";
import ProductCheckout from "./pages/ProductCheckout";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ListProducts from "./pages/ListProducts";
import ListOrders from "./pages/ListOrders";
import ListUsers from "./pages/ListUsers";
import ListCategories from "./pages/ListCategories";
import ListVouchers from "./pages/ListVouchers";
import ListReviews from "./pages/ListReviews";
import NotFoundPage from "./pages/NotFoundPage";
import WishlistPage from "./pages/WishlistPage";
import StaticPage from "./pages/StaticPage";
import { staticContent } from "./data/staticContent";
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
          <Route path="/oauth-callback" element={<OAuthCallback />} />

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
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
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
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
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
          
          {/* Static Footer Pages */}
          <Route path="/about" element={<StaticPage title="About Us" content={staticContent.about} />} />
          <Route path="/blog" element={<StaticPage title="Blog" content={staticContent.blog} />} />
          <Route path="/careers" element={<StaticPage title="Careers" content={staticContent.careers} />} />
          <Route path="/partner" element={<StaticPage title="Partner With Us" content={staticContent.partner} />} />
          <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" content={staticContent.privacy} />} />
          <Route path="/terms" element={<StaticPage title="Terms of Service" content={staticContent.terms} />} />
          <Route path="/cookie-policy" element={<StaticPage title="Cookie Policy" content={staticContent.cookies} />} />
          <Route path="/faq" element={<StaticPage title="FAQ" content={staticContent.faq} />} />

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
          <Route
            path="/admin-categories"
            element={
              <AdminRoute>
                <ListCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-vouchers"
            element={
              <AdminRoute>
                <ListVouchers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-reviews"
            element={
              <AdminRoute>
                <ListReviews />
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
