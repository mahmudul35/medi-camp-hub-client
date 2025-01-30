import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useContextt from "../../hooks/useContext";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContextt();
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axiosSecure.get(`/payments/${user?.email}`).then((res) => {
      // Add "Pending" status if confirmationStatus is missing
      const updatedPayments = res.data.map((payment) => ({
        ...payment,
        confirmationStatus: payment.confirmationStatus || "Pending",
      }));
      setPayments(updatedPayments);
    });
  }, [user?.email]);

  // Handle Search
  const filteredPayments = payments.filter((payment) =>
    [
      payment.campName,
      payment.transactionId,
      new Date(payment.date).toDateString(),
    ].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const currentData = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-6">
        Your Payment History
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center items-center space-x-2">
        <input
          type="text"
          placeholder="Search by Camp Name, Transaction ID, or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="bg-pink-800 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Clear
        </button>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto">
        {currentData.length > 0 ? (
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-pink-800 text-white">
              <tr>
                <th className="px-4 py-2">Camp Name</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Confirmation Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{payment.campName}</td>
                  <td className="px-4 py-2">${payment.fees}</td>
                  <td className="px-4 py-2">{payment.transactionId}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold">
                    {payment.paymentStatus}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        payment.confirmationStatus === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {payment.confirmationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(payment.date).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center text-gray-500">
            No payment history found
          </h1>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-pink-800 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded hover:bg-pink-700 transition`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
