import { Link } from "react-router-dom";

import FeaturedProducts from "../../components/home/FeaturedProducts";

const HomePage = () => {
  return (
    <div>

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-pink-100 to-pink-200 py-24">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Handmade Crochet
            <span className="text-pink-600">
              {" "}Creations
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover beautifully handcrafted crochet products made with love,
            care, and creativity. Perfect gifts for every occasion.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/products"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-lg font-semibold transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Knot Your Nani?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-pink-50 p-6 rounded-xl text-center shadow-sm">

              <h3 className="text-xl font-semibold mb-3">
                Handmade With Love
              </h3>

              <p className="text-gray-600">
                Every product is carefully handcrafted to ensure uniqueness
                and quality.
              </p>

            </div>

            <div className="bg-pink-50 p-6 rounded-xl text-center shadow-sm">

              <h3 className="text-xl font-semibold mb-3">
                Custom Orders
              </h3>

              <p className="text-gray-600">
                Need something special? We create personalized crochet products
                just for you.
              </p>

            </div>

            <div className="bg-pink-50 p-6 rounded-xl text-center shadow-sm">

              <h3 className="text-xl font-semibold mb-3">
                Direct WhatsApp Ordering
              </h3>

              <p className="text-gray-600">
                Simple ordering process through WhatsApp for a smooth customer
                experience.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Featured Products */}

      <section className="py-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>

            <Link
              to="/products"
              className="text-pink-600 font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <FeaturedProducts />

        </div>

      </section>

      {/* Customer Trust Section */}

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <h3 className="text-4xl font-bold text-pink-600">
                100%
              </h3>

              <p className="mt-2 text-gray-600">
                Handmade Products
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold text-pink-600">
                Quality
              </h3>

              <p className="mt-2 text-gray-600">
                Premium Materials Used
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold text-pink-600">
                Support
              </h3>

              <p className="mt-2 text-gray-600">
                Friendly Customer Assistance
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="bg-pink-500 py-16">

        <div className="max-w-4xl mx-auto text-center px-4">

          <h2 className="text-4xl font-bold text-white">
            Looking For Something Unique?
          </h2>

          <p className="mt-4 text-pink-100 text-lg">
            Contact us for custom crochet creations tailored to your needs.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-8 bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Request Custom Order
          </Link>

        </div>

      </section>

    </div>
  );
};

export default HomePage;