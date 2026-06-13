import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../api/adminProductApi";

import {
  getCategories,
} from "../../api/categoryApi";

const EditProductPage = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [categories,
    setCategories] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [form,
    setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "",
      featured: false,
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const [
          productData,
          categoryData,
        ] =
          await Promise.all([
            getProductById(
              id
            ),
            getCategories(),
          ]);

        const product =
          productData.product;

        setForm({
          name:
            product.name,
          description:
            product.description,
          price:
            product.price,
          stock:
            product.stock,
          category:
            product.category
              ?._id,
          featured:
            product.featured || false,
        });

        setCategories(
          categoryData.categories
        );
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    };

const handleChange =
  (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateProduct(
          id,
          form
        );

        alert(
          "Product updated successfully"
        );

        navigate(
          "/admin/products"
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  if (loading) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={
            form.description
          }
          onChange={
            handleChange
          }
          rows="4"
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          value={
            form.price
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          value={
            form.category
          }
          onChange={
            handleChange
          }
          className="w-full border p-3 rounded"
        >

          {categories.map(
            (category) => (
              <option
                key={
                  category._id
                }
                value={
                  category._id
                }
              >
                {
                  category.name
                }
              </option>
            )
          )}

        </select>

        <div className="flex items-center gap-3">

  <input
    type="checkbox"
    name="featured"
    checked={form.featured}
    onChange={handleChange}
  />

  <label>
    Featured Product
  </label>

</div>

        <button
          className="bg-pink-500 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>

      </form>

    </div>
  );
};

export default EditProductPage;