import { Link } from "react-router-dom";

import { useWishlist } from "../../context/WishlistContext";

const WishlistPage = () => {
  const {
    wishlistItems,
    removeWishlist,
  } = useWishlist();

  if (
    wishlistItems.length === 0
  ) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4 text-center">

        <h1 className="text-3xl font-bold mb-4">
          Your Wishlist Is Empty
        </h1>

        <p className="text-gray-500 mb-6">
          Save your favorite crochet products here.
        </p>

        <Link
          to="/products"
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
        >
          Browse Products
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {wishlistItems.map(
          (product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              <img
                src={
                  product.images?.[0]
                    ?.url ||
                  "https://via.placeholder.com/400"
                }
                alt={
                  product.name
                }
                className="w-full h-60 object-cover"
              />

              <div className="p-4">

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-pink-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <div className="flex gap-3 mt-4">

                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 text-center bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      removeWishlist(
                        product._id
                      )
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default WishlistPage;