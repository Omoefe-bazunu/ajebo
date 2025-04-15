import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Modal = ({ item, type, onClose }) => {
  const { addToCart } = useContext(AppContext);
  const [selectedSize, setSelectedSize] = useState(
    type === "fashion" ? item.sizes[0] : null
  );

  const handleAddToCart = () => {
    addToCart({ ...item, size: selectedSize });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#e0e0e0] p-6 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] max-w-md w-full text-gray-800">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-80 object-cover rounded-xl mb-4 shadow-inner"
        />
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        <p className="mb-2">{item.description}</p>
        <p className="text-lg font-semibold mb-4">${item.price}</p>

        {type === "fashion" && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 rounded-xl shadow-inner bg-[#e0e0e0] outline-none"
            >
              {item.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-between gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl shadow-md transition"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
