import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold text-pink-400">
              Knot Your Nani
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Handmade crochet creations crafted with love, creativity,
              and attention to detail. Discover unique products perfect
              for gifting and personal use.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">

              <Link
                to="/"
                className="hover:text-pink-400"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-pink-400"
              >
                Products
              </Link>

              <Link
                to="/wishlist"
                className="hover:text-pink-400"
              >
                Wishlist
              </Link>

              <Link
                to="/contact"
                className="hover:text-pink-400"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Get In Touch
            </h3>

            <div className="text-gray-400 space-y-2">

              <p>
                Custom crochet orders available.
              </p>

              <p>
                Contact us through the Contact page or WhatsApp ordering.
              </p>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-gray-700 mt-10 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-3">

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Knot Your Nani.
              All Rights Reserved.
            </p>

            <p className="text-gray-400 text-sm">
              Developed by{" "}
              <Link to="https://konchada-ayush-portfolio.vercel.app/" className="text-pink-400 font-semibold">
                Ayush
              </Link>
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;