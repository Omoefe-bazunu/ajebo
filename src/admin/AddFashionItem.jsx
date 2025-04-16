import React, { useState } from "react";
import { db, storage } from "../lib/firebase"; // Assuming storage is properly imported
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports

const AddFashionItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null, // Changed to handle image file directly
    description: "",
    sizes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data before adding to Firestore
    const data = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      sizes: formData.sizes.split(",").map((size) => size.trim()),
    };

    try {
      // Add the data to Firestore 'fashionItems' collection
      const docRef = await addDoc(collection(db, "fashionItems"), data);
      console.log("Fashion item added successfully:", data);

      // If an image was selected, upload it to Firebase Storage
      if (formData.image) {
        const imageRef = ref(
          storage,
          `fashionItems/${docRef.id}_${formData.image.name}`
        );
        await uploadBytes(imageRef, formData.image);

        // Get the download URL for the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Update Firestore document with the image URL
        await updateDoc(doc(db, "fashionItems", docRef.id), { imageUrl });

        console.log("Image uploaded successfully:", imageUrl);
      }

      // Optionally, reset the form after submission
      setFormData({
        name: "",
        price: "",
        image: null,
        description: "",
        sizes: "",
      });
    } catch (error) {
      console.error("Error adding fashion item:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-gray-800 mt-25">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Fashion Item</h2>
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
          name="image"
          onChange={handleFileChange}
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
        <input
          name="sizes"
          placeholder="Sizes (comma-separated)"
          value={formData.sizes}
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

export default AddFashionItem;
