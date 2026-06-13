import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] =
    useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(
          data.categories
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="flex flex-wrap gap-3 mb-8">

      <button
        onClick={() =>
          onCategoryChange("")
        }
        className={`px-4 py-2 rounded ${
          selectedCategory === ""
            ? "bg-pink-500 text-white"
            : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map(
        (category) => (
          <button
            key={category._id}
            onClick={() =>
              onCategoryChange(
                category._id
              )
            }
            className={`px-4 py-2 rounded ${
              selectedCategory ===
              category._id
                ? "bg-pink-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        )
      )}

    </div>
  );
};

export default CategoryFilter;