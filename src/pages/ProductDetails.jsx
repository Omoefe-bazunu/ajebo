import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { CartContext } from "../contexts/CartContext";

const ProductDetails = () => {
  const { id, type } = useParams();
  const { cateringItems, fashionItems } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [item, setItem] = useState(null);

  useEffect(() => {
    const items = type === "fashion" ? fashionItems : cateringItems;
    const foundItem = items.find((i) => i.id === id);
    setItem(foundItem);

    if (type === "fashion" && foundItem?.sizes?.length > 0) {
      setSelectedSize(foundItem.sizes[0]);
    }
  }, [id, type, cateringItems, fashionItems]);

  const handleAddToCart = () => {
    if (!item) return;

    const product = {
      ...item,
      quantity: 1,
      size: type === "fashion" ? selectedSize : null,
    };

    addToCart(product);
  };

  if (!item) {
    return (
      <div className="text-center py-20 text-gray-600">Loading product...</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <div className="bg-[#faeded] p-6 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] mt-25">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-96 object-cover rounded-xl mb-4 shadow-inner"
        />
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="mb-3">{item.description}</p>
        <p className="text-xl font-semibold mb-4">${item.price}</p>

        {type === "fashion" && item.sizes && (
          <div className="mb-6">
            <label className="block mb-1 font-medium">Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 shadow-inner outline-none"
            >
              {item.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="w-full lg:w-fit px-8 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full shadow-md transition"
          >
            Add to Cart
          </button>
          <div className="w-full lg:w-fit px-8 text-center bg-orange-500 hover:bg-orange-700 text-white py-2 rounded-full shadow-md transition">
            <Link to="/">Back 2 Menu</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
