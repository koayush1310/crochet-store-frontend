import {
  useEffect,
  useState,
} from "react";

import {
  getFeaturedProducts,
} from "../../api/productApi";

import ProductCard from "../products/ProductCard";

const FeaturedProducts = () => {
  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts =
    async () => {
      try {
        const data =
          await getFeaturedProducts();

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Featured Products...
      </div>
    );
  }

  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

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

    </section>
  );
};

export default FeaturedProducts;