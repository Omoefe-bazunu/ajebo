import React, { useState, useEffect } from "react";

const Hero = () => {
  const images = ["/ajebo1.jpg", "/ajebo2.jpg", "/ajebo3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[28rem] md:h-[32rem] overflow-hidden bg-off-white  shadow-[inset_0px_-10px_20px_rgba(0,0,0,0.05)]">
      {/* Image Slides */}
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`AjeboRush Fashion and Catering ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
            index === currentImage
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          onError={(e) => {
            console.error(`Failed to load image: ${img}`);
            e.target.style.display = "none";
          }}
        />
      ))}

      {/* Gradient + Morphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl shadow-[8px_8px_20px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.5)]">
          <h1
            className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-md"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome to <span className="text-coral-pink">AjeboRush</span>
          </h1>
          <p className=" text-white max-w-xl text-center mt-4">
            Savor exquisite catering with African dishes <br />
            and shop unique fashion designs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
