import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = () => {
  const {
    user,
    logout,
  } = useAuth();

  const {
    cartItems,
  } = useCart();

  const {
    wishlistCount,
  } = useWishlist();

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-pink-600"
        >
          Knot Your Nani
        </Link>

        <div className="hidden md:flex gap-6">

          <Link
            to="/"
            className="hover:text-pink-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-pink-600"
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="hover:text-pink-600"
          >
            Contact
          </Link>

        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/wishlist"
            className="relative"
          >

            <Heart />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">
                {wishlistCount}
              </span>
            )}

          </Link>

          <Link
            to="/cart"
            className="relative"
          >

            <ShoppingCart />

            {cartItems.length >
              0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">
                {
                  cartItems.length
                }
              </span>
            )}

          </Link>

          {user ? (
            <>

              <span className="hidden md:block text-sm font-medium">
                Hi, {user.name}
              </span>

              <Link
                to="/profile"
                className="text-sm hover:text-pink-600"
              >
                Profile
              </Link>

              {
                user?.role === "admin" &&
                (
                  <Link
                    to="/admin/dashboard"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Admin Panel
                  </Link>
                )
              }

              <Link
                to="/my-orders"
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                My Orders
              </Link>

              <button
                onClick={
                  logout
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>

            </>
          ) : (
            <Link
              to="/login"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;