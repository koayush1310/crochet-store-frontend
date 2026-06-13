import {
  useEffect,
  useState,
} from "react";

import {
  getMyOrders,
} from "../../api/orderApi";

const MyOrdersPage = () => {
  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const data =
          await getMyOrders();

        setOrders(
          data.orders || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const getStatusStep = (
    status
  ) => {
    switch (status) {
      case "pending":
        return 1;

      case "confirmed":
        return 2;

      case "processing":
        return 3;

      case "shipped":
        return 4;

      case "delivered":
        return 5;

      default:
        return 0;
    }
  };

  const steps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">

        <h2 className="text-xl font-semibold">
          Loading Orders...
        </h2>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">

          <p className="text-gray-500">
            No orders found
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {orders.map(
            (order) => {
              const currentStep =
                getStatusStep(
                  order.status
                );

              return (
                <div
                  key={
                    order._id
                  }
                  className="bg-white shadow rounded-xl p-6"
                >

                  {/* Header */}

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6">

                    <div>

                      <h3 className="font-bold text-lg">
                        {
                          order.orderId
                        }
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <span
                      className={`font-semibold px-3 py-1 rounded-full text-sm w-fit
                      ${
                        order.status ===
                        "cancelled"
                          ? "bg-red-100 text-red-600"
                          : order.status ===
                            "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {order.status
                        .replaceAll(
                          "_",
                          " "
                        )
                        .replace(
                          /\b\w/g,
                          (char) =>
                            char.toUpperCase()
                        )}
                    </span>

                  </div>

                  {/* Tracking */}

                  {order.status ===
                  "cancelled" ? (

                    <div className="bg-red-100 text-red-600 p-4 rounded-lg font-semibold mb-6">
                      This order has been cancelled.
                    </div>

                  ) : (

                    <div className="mb-8">

                      <div className="flex justify-between">

                        {steps.map(
                          (
                            step,
                            index
                          ) => (
                            <div
                              key={
                                step
                              }
                              className="flex flex-col items-center flex-1"
                            >

                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${
                                  index +
                                    1 <=
                                  currentStep
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 text-gray-700"
                                }`}
                              >
                                {index +
                                  1}
                              </div>

                              <span className="text-xs mt-2 text-center">
                                {
                                  step
                                }
                              </span>

                            </div>
                          )
                        )}

                      </div>

                      <div className="relative mt-4 h-2 bg-gray-200 rounded">

                        <div
                          className="absolute top-0 left-0 h-2 bg-green-500 rounded transition-all duration-500"
                          style={{
                            width: `${
                              currentStep >
                              1
                                ? ((currentStep -
                                    1) /
                                    4) *
                                  100
                                : 0
                            }%`,
                          }}
                        />

                      </div>

                    </div>

                  )}

                  {/* Products */}

                  <div className="space-y-3">

                    {order.items.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="flex justify-between border-b pb-2"
                        >

                          <span>
                            {
                              item.name
                            }
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

                  </div>

                  {/* Total */}

                  <div className="flex justify-between mt-6 text-lg font-bold">

                    <span>
                      Total
                    </span>

                    <span>
                      ₹
                      {
                        order.totalPrice
                      }
                    </span>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;