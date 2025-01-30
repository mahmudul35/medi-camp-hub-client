import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useContextt from "../../hooks/useContext";

const Analytics = () => {
  const { user } = useContextt();
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `https://medi-camp-hub-sever.vercel.app/registeredParticipants/${user?.email}`
      );
      const transformedData = response.data.map((camp) => ({
        name: camp.campName,
        fees: camp.campFees,
      }));
      setAnalyticsData(transformedData);
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    }
  };

  // Custom colors for the pie chart
  const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Analytics Dashboard
      </h1>

      {/* Charts Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Camp Fees Comparison
          </h2>
          {analyticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analyticsData} margin={{ top: 20, bottom: 40 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fees" fill="#ff6384" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No data available.</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Fees Distribution by Camp
          </h2>
          {analyticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={analyticsData}
                  dataKey="fees"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  fill="#8884d8"
                  label
                >
                  {analyticsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
