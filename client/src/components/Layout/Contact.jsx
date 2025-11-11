import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("http://localhost:5000/api/messages/contact", {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      console.log("Server response:", response.data);

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      setStatus("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">
        Get in <span>Touch</span>
      </h2>
      <p className="contact-subtitle">
        We’d love to hear from you! Fill out the form below and our team will
        respond shortly.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="contact-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className="text-center text-sm mt-4 text-gray-700">{status}</p>
        )}
      </form>
    </section>
  );
};

export default Contact;
