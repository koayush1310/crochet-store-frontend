import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your Cart is Empty
        </h1>

        <Link
          to="/products"
          className="bg-pink-500 text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-4">

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
          >

            <img
              src={
                item.images?.[0]?.url ||
                "https://via.placeholder.com/150"
              }
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-pink-600 font-bold">
                ₹{item.price}
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  decreaseQty(item._id)
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQty(item._id)
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                removeFromCart(item._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
          Total: ₹{total}
        </h2>

        <Link
          to="/checkout"
          className="inline-block mt-4 bg-pink-500 text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </Link>

      </div>

    </div>
  );
};

export default CartPage;