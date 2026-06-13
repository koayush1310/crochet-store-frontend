import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getAllProducts,
  deleteProduct,
} from "../../api/adminProductApi";

const AdminProductsPage = () => {
  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const data =
          await getAllProducts();

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(id);

        fetchProducts();
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <h2>
        Loading Products...
      </h2>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          to="/admin/products/add"
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100 text-center">

              <th className="p-4">
                Image
              </th>

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Featured
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (
                <tr
                  key={
                    product._id
                  }
                  className="border-t text-center"
                >

                  <td className="p-4">

                    <img
                      src={
                        product
                          .images?.[0]
                          ?.url
                      }
                      alt={
                        product.name
                      }
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />

                  </td>

                  <td className="p-4">
                    {
                      product.name
                    }
                  </td>

                  <td className="p-4">
                    ₹
                    {
                      product.price
                    }
                  </td>

                  <td className="p-4">
                    {product.featured ? "⭐ Yes" : "No"}
                  </td>

                  <td className="p-4 flex gap-2 justify-center">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => 
                        handleDelete(product._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

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

export default AdminProductsPage;