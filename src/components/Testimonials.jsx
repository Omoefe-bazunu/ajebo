import React, { useEffect, useState } from "react";
import { RiSingleQuotesL } from "react-icons/ri";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setFade(true);
      }, 500); // wait for fade out before showing next
    }, 3000); // switch testimonial every 3s

    return () => clearInterval(interval);
  }, [testimonials]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-r from-[#2c2c54] via-[#3b2772] to-[#6c5ce7] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2
          className="text-2xl md:text-4xl font-bold mb-12 tracking-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          What Our Customers Say
        </h2>

        {current && (
          <div
            className={`relative p-6 rounded-2xl max-w-xl mx-auto transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            } backdrop-blur-xl bg-white/10 shadow-[inset_1px_1px_5px_rgba(255,255,255,0.1),2px_2px_10px_rgba(0,0,0,0.2)]`}
          >
            <div className="absolute -top-4 left-4 bg-yellow-400 text-black rounded-full p-2 shadow-md">
              <RiSingleQuotesL className="w-6 h-6" />
            </div>

            <p className="text-lg leading-relaxed italic mt-6 mb-4 text-white/90">
              "{current.quote}"
            </p>

            <p className="text-sm font-semibold text-yellow-300 tracking-wide">
              — {current.name}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
