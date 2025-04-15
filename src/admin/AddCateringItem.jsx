import React, { useState } from "react";
import { db, storage } from "../lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCateringItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      // First, add a new document to get the doc ID
      const newDocRef = doc(collection(db, "cateringItems"));
      const docId = newDocRef.id;

      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `cateringItems/${docId}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Save all data including image URL to Firestore
      const data = {
        ...formData,
        imageUrl: imageUrl,
      };
      await setDoc(newDocRef, data);

      console.log("Catering item added successfully:", data);

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding catering item:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-25 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Catering Item</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]"
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCateringItem;
