import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Slider/Home";
import Contact from "./components/Layout/Contact";
import About from "./components/Layout/About";
import Feature from "./components/Layout/Feature";
import SliderUs from "./components/Layout/SliderUs";
import Services from "./components/Layout/Services";
import AdminLogin from "./components/Auth/AdminLogin";
import AdminDashboard from "./components/Layout/AdminDashboard";  


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/sliderus" element={<SliderUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
