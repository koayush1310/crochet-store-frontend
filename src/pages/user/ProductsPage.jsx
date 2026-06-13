import { useEffect, useState } from "react";

import { getProducts } from "../../api/productApi";

import ProductCard from "../../components/products/ProductCard";
import CategoryFilter from "../../components/products/CategoryFilter";

const ProductsPage = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [
    selectedCategory,
    sort,
    page,
  ]);

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const data =
          await getProducts({
            category:
              selectedCategory,
            keyword: search,
            sort,
            page,
          });

        setProducts(
          data.products || []
        );

        setTotalPages(
          data.totalPages || 1
        );
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const handleSearch =
    () => {
      setPage(1);
      fetchProducts();
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Our Products
      </h1>

      {/* Search + Sort */}

      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="border rounded-lg px-4 py-2"
        >

          <option value="">
            Sort By
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

        </select>

        <button
          onClick={
            handleSearch
          }
          className="bg-pink-500 text-white px-6 py-2 rounded-lg"
        >
          Search
        </button>

      </div>

      {/* Category Filter */}

      <CategoryFilter
        selectedCategory={
          selectedCategory
        }
        onCategoryChange={
          (value) => {
            setPage(1);
            setSelectedCategory(
              value
            );
          }
        }
      />

      {/* Loading */}

      {loading ? (
        <div className="text-center py-10">

          <h2>
            Loading Products...
          </h2>

        </div>
      ) : products.length ===
        0 ? (
        <div className="text-center py-10">

          <h2 className="text-gray-500">
            No products found
          </h2>

        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}

          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-4 mt-10">

            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="flex items-center">
              Page {page} of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default ProductsPage;