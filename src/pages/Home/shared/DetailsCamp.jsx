import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DetailsCamp = () => {
  const { id } = useParams();
  console.log(id);
  const [camp, setCamp] = useState([]);
  useEffect(() => {
    // Fetch the camp details from the backend
    axios
      .get(`http://localhost:3000/camp/${id}`)
      .then((response) => setCamp(response.data))
      .catch((error) => console.error(error));
  }, [id]);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333", textAlign: "center" }}>Camp Details</h1>
      {camp ? (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#555" }}>{camp.name}</h2>
          <p style={{ color: "#777" }}>{camp.description}</p>
          <p style={{ color: "#777" }}>
            <strong>Location:</strong> {camp.location}
          </p>
          <p style={{ color: "#777" }}>
            <strong>Date:</strong> {camp.date}
          </p>
          <p style={{ color: "#777" }}>
            <strong>Price:</strong> ${camp.price}
          </p>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>Loading...</p>
      )}
    </div>
  );
};

export default DetailsCamp;
