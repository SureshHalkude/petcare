import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Backend API call
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Response:", response.data);
      setMessage("✅ Account created successfully! Redirecting...");

      // Optionally, store token or redirect
      localStorage.setItem("token", response.data.token);

      // Redirect to login or homepage
      setTimeout(() => {
        window.location.href = "/login"; // redirect after signup
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          className="border p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="border p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border p-3 w-full mb-6 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white w-full py-3 rounded transition`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center text-sm text-red-500 mt-4">{message}</p>
        )}

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
