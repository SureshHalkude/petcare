import React from "react";
import "./Feature.css";
import { FaPaw, FaShieldAlt, FaClock, FaSmileBeam } from "react-icons/fa";

const Feature = ({ plan = "standard" }) => {
  const features = {
    standard: [
      {
        icon: <FaPaw />,
        title: "Professional Caregivers",
        description: "Trained pet sitters and groomers who love animals.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Safe & Secure",
        description: "Hygienic environment and health checks for your pets.",
      },
      {
        icon: <FaClock />,
        title: "On-Time Service",
        description: "Timely walks, feeding, and grooming appointments.",
      },
      {
        icon: <FaSmileBeam />,
        title: "Pet Happiness",
        description: "Playtime, cuddles, and care for your pet’s well-being.",
      },
    ],
    premium: [
      {
        icon: <FaPaw />,
        title: "Certified Pet Experts",
        description: "Veterinarians and certified trainers for premium care.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Insurance & Safety",
        description: "Premium insurance coverage and 24/7 monitoring.",
      },
      {
        icon: <FaClock />,
        title: "Priority Service",
        description: "Faster bookings and dedicated caregivers.",
      },
      {
        icon: <FaSmileBeam />,
        title: "Luxury Experience",
        description: "Spa, grooming, and custom meal plans for pets.",
      },
    ],
  };

  return (
    <section className="features">
      <h2 className="features-title">
        Why Choose <span>PetCare?</span>
      </h2>
      <p className="features-subtitle">
        We ensure your pets receive the best care, love, and attention.
      </p>
      <div className="feature-grid">
        {features[plan].map((item, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
