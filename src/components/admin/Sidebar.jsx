import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-8">
        Crochet Admin
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/admin/dashboard"
          className="hover:text-pink-600"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:text-pink-600"
        >
          Products
        </Link>

        <Link
          to="/admin/categories"
          className="hover:text-pink-600"
        >
          Categories
        </Link>

        <Link
          to="/admin/orders"
          className="hover:text-pink-600"
        >
          Orders
        </Link>

        <Link
          to="/admin/contacts"
          className="hover:text-pink-600"
        >
          Contacts
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;