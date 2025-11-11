import React, { useState } from "react";
import axios from "axios";
import "./Services.css";

const services = [
  { name: "Basic Checkup", type: "Standard", price: "₹500" },
  { name: "Vaccination", type: "Standard", price: "₹700" },
  { name: "Grooming", type: "Standard", price: "₹800" },
  { name: "Dental Care", type: "Premium", price: "₹1200" },
  { name: "Full Body Grooming", type: "Premium", price: "₹1500" },
  { name: "Health Screening", type: "Premium", price: "₹2000" },
  { name: "Nutrition Advice", type: "Standard", price: "₹400" },
  { name: "Training", type: "Premium", price: "₹2500" },
  { name: "Pet Spa", type: "Premium", price: "₹1800" },
];

function Services() {
  const [message, setMessage] = useState("");

  const handleBooking = async (service) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before booking a service!");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/book",
        {
          serviceName: service.name,
          serviceType: service.type,
          servicePrice: service.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking response:", response.data);
      setMessage(`✅ ${service.name} booked successfully!`);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("❌ Failed to book service. Try again.");
    }
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${
              service.type === "Premium" ? "premium" : "standard"
            }`}
            onClick={() => handleBooking(service)}
          >
            <h3>{service.name}</h3>
            <p>Type: {service.type}</p>
            <p>Price: {service.price}</p>
          </div>
        ))}
      </div>

      {message && (
        <p className="text-center text-green-600 mt-4 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}

export default Services;
