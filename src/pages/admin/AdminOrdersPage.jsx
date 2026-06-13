import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
  updateOrderStatus,
} from "../../api/adminOrderApi";

const AdminOrdersPage =
  () => {
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
            await getOrders();

          setOrders(
            data.orders || []
          );
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    const handleStatusChange =
      async (
        id,
        status
      ) => {
        try {
          await updateOrderStatus(
            id,
            status
          );

          fetchOrders();
        } catch (error) {
          console.error(
            error
          );
        }
      };

    if (loading) {
      return (
        <h2>
          Loading Orders...
        </h2>
      );
    }

    return (
      <div>

        <h1 className="text-3xl font-bold mb-6">
          Orders
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3">
                  Order ID
                </th>

                <th className="p-3">
                  Customer
                </th>

                <th className="p-3">
                  Phone
                </th>

                <th className="p-3">
                  Total
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map(
                (order) => (
                  <tr
                    key={
                      order._id
                    }
                    className="border-t"
                  >

                    <td className="p-3">
                      {
                        order.orderId
                      }
                    </td>

                    <td className="p-3">
                      {
                        order.customerName
                      }
                    </td>

                    <td className="p-3">
                      {
                        order.phone
                      }
                    </td>

                    <td className="p-3">
                      ₹
                      {
                        order.totalPrice
                      }
                    </td>

                    <td className="p-3">

                      <select
                        value={
                          order.status
                        }
                        onChange={(
                          e
                        ) =>
                          handleStatusChange(
                            order._id,
                            e
                              .target
                              .value
                          )
                        }
                        className="border rounded px-2 py-1"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    );
  };

export default AdminOrdersPage;