import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 mt-25">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/add-catering"
          className="p-4 bg-orange-500 text-white shadow rounded hover:shadow-lg"
        >
          Add Catering Item
        </Link>
        <Link
          to="/admin/add-fashion"
          className="p-4 bg-orange-500 text-white shadow rounded hover:shadow-lg"
        >
          Add Fashion Item
        </Link>
        <Link
          to="/admin/manage-items"
          className="p-4 bg-orange-500 text-white shadow rounded hover:shadow-lg"
        >
          Manage All Items
        </Link>
        <Link
          to="/admin/reviews"
          className="p-4 bg-orange-500 text-white shadow rounded hover:shadow-lg"
        >
          Add Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
