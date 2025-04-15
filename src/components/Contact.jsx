import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("Please fill out all fields.");
      return;
    }

    const phoneNumber = "2349043970401"; // Replace with your client's WhatsApp number
    const text = `New Contact Form Submission:%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");

    setStatus("Redirecting to WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#1f1f2e] via-[#2d2a4a] to-[#3b2772] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl text-center font-bold text-yellow-400 mb-12"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-white/10"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm mb-2 font-medium text-white"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm mb-2 font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm mb-2 font-medium text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            Send Message
          </button>

          {status && (
            <p
              className={`mt-4 text-center font-medium ${
                status.includes("successfully")
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {status}
            </p>
          )}
        </form>
        <div className="mt-8 text-center">
          <p className="text-white/80 mb-3">Prefer to chat directly?</p>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
