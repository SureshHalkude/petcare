import React, { useState, useEffect } from "react";
import pet1 from "../../assets/images/pet1.jpg";
import pet2 from "../../assets/images/pet2.jpg";
import pet3 from "../../assets/images/pet3.jpg";
import pet4 from "../../assets/images/pet4.jpg";
import pet5 from "../../assets/images/pet5.jpg";
import "./SliderUs.css";

const images = [pet1, pet2, pet3, pet4, pet5];

function SliderUs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className="carousel-image"
          />
        ))}
      </div>

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>
        ◀
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ▶
      </button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderUs;
