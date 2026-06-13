import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
} from "../../api/adminApi";

const AdminDashboardPage = () => {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
    });

  const [
    recentOrders,
    setRecentOrders,
  ] = useState([]);

  const [
    topProducts,
    setTopProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        setLoading(true);
        setError("");

        const [
          statsData,
          ordersData,
          productsData,
        ] = await Promise.all([
          getDashboardStats(),
          getRecentOrders(),
          getTopProducts(),
        ]);

        setStats(
          statsData?.stats || {
            totalProducts: 0,
            totalCategories: 0,
            totalOrders: 0,
            totalCustomers: 0,
            totalRevenue: 0,
          }
        );

        setRecentOrders(
          ordersData?.orders || []
        );

        setTopProducts(
          productsData?.topProducts ||
            []
        );
      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );

        setError(
          error.response?.data
            ?.message ||
            "Failed to load dashboard data"
        );

        setStats({
          totalProducts: 0,
          totalCategories: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalRevenue: 0,
        });

        setRecentOrders([]);
        setTopProducts([]);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Products
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Categories
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Orders
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Customers
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalCustomers}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Revenue
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow p-6 mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">
            No orders found
          </p>
        ) : (
          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-2">
                  Order ID
                </th>

                <th className="text-left py-2">
                  Customer
                </th>

                <th className="text-left py-2">
                  Status
                </th>

                <th className="text-left py-2">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>

              {recentOrders.map(
                (order) => (
                  <tr
                    key={order._id}
                    className="border-b"
                  >
                    <td className="py-3">
                      {
                        order.orderId
                      }
                    </td>

                    <td className="py-3">
                      {
                        order.customerName
                      }
                    </td>

                    <td className="py-3 capitalize">
                      {
                        order.status
                      }
                    </td>

                    <td className="py-3">
                      ₹
                      {
                        order.totalPrice
                      }
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        )}

      </div>

      {/* Top Products */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Top Selling Products
        </h2>

        {topProducts.length === 0 ? (
          <p className="text-gray-500">
            No sales data available
          </p>
        ) : (
          <div className="space-y-3">

            {topProducts.map(
              (
                product,
                index
              ) => (
                <div
                  key={
                    product._id
                  }
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    #{index + 1}
                  </span>

                  <span>
                    Product ID:
                    {" "}
                    {
                      product._id
                    }
                  </span>

                  <span>
                    Sold:
                    {" "}
                    {
                      product.totalSold
                    }
                  </span>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboardPage;