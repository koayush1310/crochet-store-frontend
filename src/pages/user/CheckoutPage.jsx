import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { getProfile } from "../../api/profileApi"

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    cartItems,
    total,
    clearCart,
  } = useCart();

  const [form, setForm] =
    useState({
      customerName: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [savedAddresses,
    setSavedAddresses] = 
    useState([]);

  const [selectedAddress,
    setSelectedAddress] = 
    useState("");

useEffect(() => {
  if (!user) {
    alert(
      "Please login to place an order"
    );

    navigate("/login");
    return;
  }

  fetchProfileData();
}, [user, navigate]);

const fetchProfileData =
  async () => {
    try {
      const data =
        await getProfile();

      setSavedAddresses(
        data.user.addresses || []
      );

      if (
        data.user.addresses?.length >
        0
      ) {
        const address =
          data.user.addresses[0];

        setSelectedAddress("0");

        setForm({
          customerName:
            address.fullName || "",
          phone:
            address.phone || "",
          address:
            address.addressLine || "",
          city:
            address.city || "",
          pincode:
            address.pincode || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      cartItems.length === 0
    ) {
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName:
          form.customerName,

        phone: form.phone,

        address: `
${form.address},
${form.city} - ${form.pincode}
        `.trim(),

        items: cartItems.map(
          (item) => ({
            product:
              item._id,

            name:
              item.name,

            image:
              item.images?.[0]
                ?.url || "",

            price:
              item.price,

            quantity:
              item.quantity,
          })
        ),
      };

      const response =
        await createOrder(
          orderData
        );

      clearCart();

      setForm({
        customerName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      });

      window.location.href =
        response.whatsappUrl;

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (
    cartItems.length === 0
  ) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Your Cart Is Empty
        </h2>

        <p className="text-gray-500 mb-6">
          Add some beautiful crochet products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >

          <h2 className="text-xl font-semibold">
            Customer Details
          </h2>

          {savedAddresses.length >
  0 && (
  <select
    value={
      selectedAddress
    }
    onChange={(e) => {
      const index =
        e.target.value;

      setSelectedAddress(
        index
      );

      const address =
        savedAddresses[
          index
        ];

      setForm({
        customerName:
          address.fullName ||
          "",
        phone:
          address.phone ||
          "",
        address:
          address.addressLine ||
          "",
        city:
          address.city || "",
        pincode:
          address.pincode ||
          "",
      });
    }}
    className="w-full border rounded-lg p-3"
  >
    {savedAddresses.map(
      (
        address,
        index
      ) => (
        <option
          key={index}
          value={index}
        >
          {address.fullName}
          {" - "}
          {
            address.city
          }
        </option>
      )
    )}
  </select>
)}

          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={
              form.customerName
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={
              form.phone
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={
              form.address
            }
            onChange={
              handleChange
            }
            required
            rows="4"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={
              form.city
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={
              form.pincode
            }
            onChange={
              handleChange
            }
            required
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? "Processing Order..."
              : "Place Order on WhatsApp"}
          </button>

        </form>

        <div className="bg-gray-100 rounded-lg p-6 h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.map(
            (item) => (
              <div
                key={
                  item._id
                }
                className="flex justify-between py-2 border-b"
              >

                <span>
                  {item.name}
                  {" × "}
                  {
                    item.quantity
                  }
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>

              </div>
            )
          )}

          <div className="flex justify-between mt-4 text-xl font-bold">

            <span>
              Total
            </span>

            <span>
              ₹{total}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;