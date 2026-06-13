import {
  useEffect,
  useState,
} from "react";

import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../api/adminCategoryApi";

const CategoriesPage = () => {
  const [categories,
    setCategories] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories =
    async () => {
      try {
        const data =
          await getAllCategories();

        setCategories(
          data.categories || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createCategory({
          name,
        });

        setName("");

        fetchCategories();
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to create category"
        );
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this category?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteCategory(
          id
        );

        fetchCategories();
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <h2>
        Loading Categories...
      </h2>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className="flex-1 border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-pink-500 text-white px-6 rounded"
          >
            Add
          </button>

        </div>

      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map(
              (category) => (
                <tr
                  key={
                    category._id
                  }
                  className="border-t text-center"
                >

                  <td className="p-4">
                    {
                      category.name
                    }
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          category._id
                        )
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

export default CategoriesPage;