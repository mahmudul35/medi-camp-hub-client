import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleEdit = (user) => {
    console.log("Edit user", user);
  };
  const handleDelete = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      refetch();
      alert(res.data.message);
    });

    console.log("Delete user", user);
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/updateUser/${user._id}`).then((res) => {
      refetch();
      alert(res.data.message);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Users <span className="text-pink-600">({users.length})</span>
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-pink-800 text-white text-left">
                <th className="px-6 py-3 text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button onClick={() => handleMakeAdmin(user)}>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-lg">
                          User
                        </span>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
