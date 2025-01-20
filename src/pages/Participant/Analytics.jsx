import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useContextt from "../../hooks/useContext";
const Analytics = ({ participantId }) => {
  const { user } = useContextt();
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/registeredParticipants/${user?.email}`
      );
      const transformedData = response.data.map((camp) => ({
        name: camp.campName,
        fees: camp.campFees,
      }));
      setAnalyticsData(transformedData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Analytics
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Lifetime Registered Camps
        </h2>
        {analyticsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fees" fill="#ff6384" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">
            No data available for analytics.
          </p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
