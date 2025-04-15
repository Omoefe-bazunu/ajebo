import { Link } from "react-router-dom";

const ItemCard = ({ item, type }) => {
  return (
    <Link to={`/product/${type}/${item.id}`}>
      <div className="bg-[#e0e0e0] p-4 text-gray-700 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-lg cursor-pointer transition-all">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-80 object-cover rounded-xl mb-2"
        />
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-700">${item.price}</p>
      </div>
    </Link>
  );
};

export { ItemCard };
