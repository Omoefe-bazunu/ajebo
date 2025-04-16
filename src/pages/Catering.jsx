import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { ItemCard } from "../components/ItemCard";

const Catering = () => {
  const { cateringItems } = useContext(AppContext);

  return (
    <div className="min-h-screen py-8 px-4 mt-30 lg:mt-20 darktheme">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-700">
        Jellof Digest
      </h1>
      <p className="text-center mb-6 text-gray-700 w-[70%] mx-auto">
        Here's a complete menu of our delicious African dishes. We accept custom
        orders
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cateringItems.map((item) => (
          <ItemCard key={item.id} item={item} type="catering" />
        ))}
      </div>
    </div>
  );
};

export default Catering;
