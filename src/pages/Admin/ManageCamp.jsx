import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [editingCamp, setEditingCamp] = useState(null);

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await axios.get("http://localhost:3000/availableCamps");
      setCamps(response.data);
    } catch (error) {
      console.error("Failed to fetch camps", error);
    }
  };

  const handleDelete = async (campId) => {
    if (window.confirm("Are you sure you want to delete this camp?")) {
      try {
        await axios.delete(`http://localhost:3000/delete-camp/${campId}`);
        alert("Camp deleted successfully!");
        fetchCamps();
      } catch (error) {
        console.error("Failed to delete camp", error);
        alert("Error deleting camp.");
      }
    }
  };

  const handleEdit = (camp) => {
    setEditingCamp(camp);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(editingCamp._id);
    try {
      await axios.put(
        `http://localhost:3000/update-camp/${editingCamp._id}`,
        editingCamp
      );
      console.log(editingCamp);
      alert("Camp updated successfully!");
      setEditingCamp(null);
      fetchCamps();
    } catch (error) {
      console.error("Failed to update camp", error);
      alert("Error updating camp.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Manage Camps
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-pink-800 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Healthcare Professional</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id} className="border-b">
                <td className="px-4 py-2">{camp.name}</td>
                <td className="px-4 py-2">
                  {new Date(camp.dateTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">{camp.location}</td>
                <td className="px-4 py-2">{camp.healthcareProfessional}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(camp)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingCamp && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-lg shadow-lg p-6 w-96"
          >
            <h2 className="text-2xl font-bold mb-4">Edit Camp</h2>
            <input
              type="text"
              value={editingCamp.name}
              onChange={(e) =>
                setEditingCamp({ ...editingCamp, name: e.target.value })
              }
              placeholder="Camp Name"
              className="w-full border rounded mb-3 p-2"
            />
            <input
              type="datetime-local"
              value={editingCamp.dateTime}
              onChange={(e) =>
                setEditingCamp({ ...editingCamp, dateTime: e.target.value })
              }
              className="w-full border rounded mb-3 p-2"
            />
            <input
              type="text"
              value={editingCamp.location}
              onChange={(e) =>
                setEditingCamp({ ...editingCamp, location: e.target.value })
              }
              placeholder="Location"
              className="w-full border rounded mb-3 p-2"
            />
            <input
              type="text"
              value={editingCamp.healthcareProfessional}
              onChange={(e) =>
                setEditingCamp({
                  ...editingCamp,
                  healthcareProfessional: e.target.value,
                })
              }
              placeholder="Healthcare Professional"
              className="w-full border rounded mb-3 p-2"
            />
            <button
              type="submit"
              className="w-full bg-pink-800 text-white py-2 px-4 rounded hover:bg-pink-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingCamp(null)}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
