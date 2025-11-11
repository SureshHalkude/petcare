import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Care With Love 🐾</h1>
      <p className="about-description">
        Welcome to <strong>PetCare</strong>, your trusted partner in providing 
        exceptional services for your furry friends. We understand that pets 
        are family, and we’re here to ensure their happiness, health, and 
        well-being.  
        <br /> <br />
        {/* From grooming to veterinary care, walking to training, we are committed 
        to making pet care convenient and stress-free for you.   */}
        hiiii
      </p>

      <div className="about-buttons">
        {/* <button className="btn-primary">Book a Service</button> */}
        <button className="btn-secondary">Contact Us</button>
      </div>

      <div className="about-image">
        <img
          src="https://media.istockphoto.com/id/1477761171/photo/owner-feeding-her-pet-at-home.jpg?s=2048x2048&w=is&k=20&c=VLYSEsyTXI3xF0BIc4xGBJjNRovdBoCWFlWdPeuXheg="
          alt="Happy pet care"
        />
      </div>
    </div>
  );
};

export default About;
