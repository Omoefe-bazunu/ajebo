import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { ItemCard } from "../components/ItemCard";
import Testimonial from "../components/Testimonials";
import Contact from "../components/Contact";
import { AppContext } from "../contexts/AppContext";

const Home = () => {
  const { cateringItems, fashionItems } = useContext(AppContext);

  return (
    <div>
      <Hero />

      <section className="py-8 darktheme">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-700">
          Catering Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {cateringItems.slice(0, 3).map((item) => (
            <ItemCard key={item.id} item={item} type="catering" />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/catering"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
          >
            See More
          </Link>
        </div>
      </section>

      <section className="py-8 bg-[#fcf7f7]">
        <h2 className="text-2xl text-gray-700 font-bold text-center mb-12">
          Fashion Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {fashionItems.slice(0, 3).map((item) => (
            <ItemCard key={item.id} item={item} type="fashion" />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/fashion"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
          >
            See More
          </Link>
        </div>
      </section>

      <Testimonial />
      <Contact />
    </div>
  );
};

export default Home;
