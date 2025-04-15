import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { ItemCard } from "../components/ItemCard";

const Fashion = () => {
  const { fashionItems } = useContext(AppContext);

  return (
    <div className="min-h-screen py-8 px-4 mt-25 text-gray-700">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-700">
        ART Wear
      </h1>
      <p className="text-center mb-6 text-gray-700 w-[70%] mx-auto">
        Here's a complete display of our amazing outfits. We accept custom
        orders
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fashionItems.map((item) => (
          <ItemCard key={item.id + item.name} item={item} type="fashion" />
        ))}
      </div>
    </div>
  );
};

export default Fashion;
