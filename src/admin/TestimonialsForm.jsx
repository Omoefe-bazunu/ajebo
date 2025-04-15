import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TestimonialsForm = () => {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quote) {
      setMessage("All fields are required.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      await addDoc(collection(db, "testimonials"), {
        name,
        quote,
        createdAt: serverTimestamp(),
      });

      setName("");
      setQuote("");
      setMessage("Testimonial submitted!");
    } catch (error) {
      console.error("Error adding testimonial: ", error);
      setMessage("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white rounded shadow my-26"
    >
      <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
      />

      <textarea
        placeholder="Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
        rows={4}
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-coral-pink/80"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </form>
  );
};

export default TestimonialsForm;
