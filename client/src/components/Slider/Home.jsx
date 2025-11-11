import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Layout/About";
import Feature from "../Layout/Feature";
import SliderUs from "../Layout/SliderUs";
import Contact from "../Layout/Contact";
import Services from "../Layout/Services";

function Home() {
  return (
    <div>
        <About />
        <Feature />
        <SliderUs />
        <Services />
        <Contact />
    </div>
  );
}

export default Home;
