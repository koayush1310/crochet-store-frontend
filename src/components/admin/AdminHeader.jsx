const AdminHeader = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

    </div>
  );
};

export default AdminHeader;