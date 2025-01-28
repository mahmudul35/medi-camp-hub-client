import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "https://medi-camp-hub-sever.vercel.app/feedbacks"
      );
      setFeedbacks(response.data);
    } catch (error) {}
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-6 w-6 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.691h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.445a1 1 0 00-.363 1.118l1.286 3.962c.3.921-.755 1.688-1.538 1.118l-3.367-2.445a1 1 0 00-1.175 0l-3.367 2.445c-.783.57-1.838-.197-1.538-1.118l1.286-3.962a1 1 0 00-.363-1.118L2.464 9.39c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.691l1.286-3.962z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">
        Participant Feedback and Ratings
      </h1>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No feedback available yet.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feedback.participantName}
              </h3>
              <p className="text-gray-600 mb-4 italic">
                "{feedback.feedbackText}"
              </p>
              <div className="flex items-center mb-4">
                {renderStars(feedback.rating)}
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Camp:</span> {feedback.campName}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(feedback.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;
