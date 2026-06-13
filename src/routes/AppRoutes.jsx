import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import ProtectedAdminRoute from "../components/auth/ProtectedAdminRoute.jsx";

// User Pages
import HomePage from "../pages/user/HomePage.jsx";
import ProductsPage from "../pages/user/ProductsPage.jsx";
import ProductDetailsPage from "../pages/user/ProductDetailsPage.jsx";
import CartPage from "../pages/user/CartPage.jsx";
import CheckoutPage from "../pages/user/CheckoutPage.jsx";
import WishlistPage from "../pages/user/WishlistPage.jsx";
import ContactPage from "../pages/user/ContactPage.jsx";
import LoginPage from "../pages/user/LoginPage.jsx";
import RegisterPage from "../pages/user/RegisterPage.jsx";
import MyOrdersPage from "../pages/user/MyOrdersPage.jsx";
import ProfilePage from "../pages/user/ProfilePage.jsx";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminProductsPage from "../pages/admin/AdminProductsPage.jsx";
import AddProductPage from "../pages/admin/AddProductPage.jsx";
import EditProductPage from "../pages/admin/EditProductPage.jsx";
import CategoriesPage from "../pages/admin/CategoriesPage.jsx";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage.jsx";
import AdminContactsPage from "../pages/admin/AdminContactsPage.jsx"

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">

    <h1 className="text-6xl font-bold text-pink-500">
      404
    </h1>

    <p className="mt-4 text-gray-600">
      Page not found
    </p>

  </div>
);

const AppRoutes = () => {
  return (
    <Routes>

      {/* User Routes */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetailsPage />
          }
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishlistPage />
          }
        />

        <Route
          path="/contact"
          element={
            <ContactPage />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/my-orders"
          element={
            <MyOrdersPage />
          }
        />

      </Route>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={
            <AdminDashboardPage />
          }
        />

        <Route
          path="products"
          element={
            <AdminProductsPage />
          }
        />

        <Route
          path="products/add"
          element={
            <AddProductPage />
          }
        />

        <Route
          path="products/edit/:id"
          element={
            <EditProductPage />
          }
        />

        <Route
          path="categories"
          element={
            <CategoriesPage />
          }
        />

        <Route
          path="orders"
          element={
            <AdminOrdersPage />
          }
        />

        <Route
          path="contacts"
          element={
            <AdminContactsPage />
          }
        />

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
};

export default AppRoutes;