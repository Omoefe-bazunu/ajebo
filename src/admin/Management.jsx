import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const ManageItems = () => {
  const [cateringItems, setCateringItems] = useState([]);
  const [fashionItems, setFashionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("catering");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribeCatering = onSnapshot(
      collection(db, "cateringItems"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "catering",
        }));
        setCateringItems(items);
        setLoading(false);
      },
      (error) => {
        setError("Failed to load catering items");
        setLoading(false);
      }
    );

    const unsubscribeFashion = onSnapshot(
      collection(db, "fashionItems"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "fashion",
        }));
        setFashionItems(items);
        setLoading(false);
      },
      (error) => {
        setError("Failed to load fashion items");
        setLoading(false);
      }
    );

    return () => {
      unsubscribeCatering();
      unsubscribeFashion();
    };
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const collectionName =
        type === "catering" ? "cateringItems" : "fashionItems";
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      setError(`Failed to delete ${type} item`);
      console.error("Delete error:", error);
    }
  };

  const currentItems = activeTab === "catering" ? cateringItems : fashionItems;

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Items</h2>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "catering"
              ? "border-b-2 border-[#FF6B35] text-[#FF6B35]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("catering")}
        >
          Catering Items
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "fashion"
              ? "border-b-2 border-[#FF6B35] text-[#FF6B35]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("fashion")}
        >
          Fashion Items
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading items...</div>
      ) : (
        <ul className="space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="p-4 rounded-2xl bg-white shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₦{item.price} • {item.type}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id, item.type)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
                  title="Delete item"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} items found.
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default ManageItems;
