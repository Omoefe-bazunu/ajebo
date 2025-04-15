import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Catering from "./pages/Catering";
import Fashion from "./pages/Fashion";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import AdminDashboard from "./admin/Index";
import AddCateringItem from "./admin/AddCateringItem";
import AddFashionItem from "./admin/AddFashionItem";
import ManageItems from "./admin/Management";
import Signup from "./auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialsForm from "./admin/TestimonialsForm";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:type/:id" element={<ProductDetails />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/fashion" element={<Fashion />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/add-catering" element={<AddCateringItem />} />
              <Route path="/admin/add-fashion" element={<AddFashionItem />} />
              <Route path="/admin/manage-items" element={<ManageItems />} />
              <Route path="/admin/reviews" element={<TestimonialsForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
