import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({
  product,
}) => {
  const { user } =
    useAuth();

  const {
    wishlistItems,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const isWishlisted =
    wishlistItems.some(
      (item) =>
        item._id ===
        product._id
    );

  const handleWishlist =
    async () => {
      if (!user) {
        alert(
          "Please login first"
        );
        return;
      }

      if (
        isWishlisted
      ) {
        await removeWishlist(
          product._id
        );
      } else {
        await addWishlist(
          product._id
        );
      }
    };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative">

      {/* Wishlist Button */}

      <button
        onClick={
          handleWishlist
        }
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <Heart
          size={20}
          fill={
            isWishlisted
              ? "currentColor"
              : "none"
          }
          className={
            isWishlisted
              ? "text-pink-500"
              : "text-gray-500"
          }
        />
      </button>

      {/* Product Image */}

      <img
        src={
          product.images?.[0]
            ?.url &&
          product.images[0].url.startsWith(
            "http"
          )
            ? product
                .images[0]
                .url
            : "https://via.placeholder.com/400"
        }
        alt={
          product.name
        }
        className="h-60 w-full object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-pink-600 font-bold mt-2">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="block mt-4 text-center bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;