import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f2e] text-white py-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
        {/* Branding */}
        <h3 className="text-2xl font-bold text-yellow-400">AjeboRush</h3>

        {/* Contact Info */}
        <div className="text-white/80 space-y-1">
          <p>Dallas-Fort Worth Metropolitan Area, TX, USA</p>
          <p>Email: info@ajeborush.com</p>
          <p>Phone: +1 (817) 298-9961</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/jellofdiges/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition p-6 rounded-full bg-gray-800"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://wa.me/+1 (817) 298-9961"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition p-6 rounded-full bg-gray-800"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-sm text-white/50 pt-4">
          &copy; {new Date().getFullYear()} AjeboRush. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
