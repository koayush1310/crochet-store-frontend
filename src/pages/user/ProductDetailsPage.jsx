import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Star,
} from "lucide-react";

import {
  getProductById,
  getRelatedProducts,
} from "../../api/productApi";

import {
  createReview,
  getReviews,
} from "../../api/reviewApi";

import {
  useCart,
} from "../../context/CartContext";

import {
  useAuth,
} from "../../context/AuthContext";

import ProductCard from "../../components/products/ProductCard";

const ProductDetailsPage =
  () => {
    const { id } =
      useParams();

    const { user } =
      useAuth();

    const {
      addToCart,
    } = useCart();

    const [product,
      setProduct] =
      useState(null);

    const [reviews,
      setReviews] =
      useState([]);

    const [relatedProducts,
      setRelatedProducts] =
      useState([]);

    const [rating,
      setRating] =
      useState(5);

    const [comment,
      setComment] =
      useState("");

    const [loading,
      setLoading] =
      useState(true);

    useEffect(() => {
      fetchData();
    }, [id]);

    const fetchData =
      async () => {
        try {
          const productData =
            await getProductById(
              id
            );

          setProduct(
            productData.product
          );

          const reviewData =
            await getReviews(
              id
            );

          setReviews(
            reviewData.reviews ||
              []
          );

          const relatedData = 
            await getRelatedProducts(
              id
            );

          setRelatedProducts(
            relatedData.products || 
              []
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

    const handleReview =
      async (e) => {
        e.preventDefault();

        try {
          await createReview({
            productId: id,
            rating,
            comment,
          });

          setComment("");

          fetchData();

          alert(
            "Review added successfully"
          );
        } catch (error) {
          alert(
            error.response?.data
              ?.message ||
              "Review failed"
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

    if (!product) {
      return (
        <h2>
          Product not found
        </h2>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="grid md:grid-cols-2 gap-10">

          <img
            src={
              product
                .images?.[0]
                ?.url ||
              "https://via.placeholder.com/500"
            }
            alt={
              product.name
            }
            className="w-full rounded-xl shadow"
          />

          <div>

            <h1 className="text-4xl font-bold mb-4">
              {
                product.name
              }
            </h1>

            <p className="text-gray-600 mb-4">
              {
                product.description
              }
            </p>

            <div className="flex items-center gap-2 mb-4">

              <Star
                size={20}
                fill="gold"
              />

              <span>
                {
                  product.rating?.toFixed(
                    1
                  )
                }
              </span>

              <span className="text-gray-500">
                (
                {
                  product.numReviews
                }
                {" "}
                reviews)
              </span>

            </div>

            <p className="text-3xl font-bold text-pink-600 mb-4">
              ₹
              {
                product.price
              }
            </p>

            <button
              onClick={() =>
                addToCart(
                  product
                )
              }
              className="bg-pink-500 text-white px-8 py-3 rounded"
            >
              Add To Cart
            </button>

          </div>

        </div>

        {/* Review Form */}

        {user && (
          <div className="mt-12 bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Write a Review
            </h2>

            <form
              onSubmit={
                handleReview
              }
              className="space-y-4"
            >

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border p-3 rounded"
              >
                <option value={5}>
                  5 Stars
                </option>
                <option value={4}>
                  4 Stars
                </option>
                <option value={3}>
                  3 Stars
                </option>
                <option value={2}>
                  2 Stars
                </option>
                <option value={1}>
                  1 Star
                </option>
              </select>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                required
                rows="4"
                placeholder="Write your review..."
                className="w-full border p-3 rounded"
              />

              <button
                className="bg-pink-500 text-white px-6 py-3 rounded"
              >
                Submit Review
              </button>

            </form>

          </div>
        )}

        {/* Reviews */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Customer Reviews
          </h2>

          {reviews.length ===
          0 ? (
            <p>
              No reviews yet
            </p>
          ) : (
            <div className="space-y-4">

              {reviews.map(
                (
                  review
                ) => (
                  <div
                    key={
                      review._id
                    }
                    className="bg-white p-5 rounded-xl shadow"
                  >

                    <h3 className="font-semibold">
                      {
                        review
                          .user
                          ?.name
                      }
                    </h3>

                    <p className="text-yellow-500">
                      {"★".repeat(
                        review.rating
                      )}
                    </p>

                    <p className="mt-2">
                      {
                        review.comment
                      }
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* Related Products */}

{relatedProducts.length >
  0 && (
  <div className="mt-16">

    <h2 className="text-3xl font-bold mb-8">
      You May Also Like
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

      {relatedProducts.map(
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

  </div>
)}

      </div>
    );
  };

export default ProductDetailsPage;