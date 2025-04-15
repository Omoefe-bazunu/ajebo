import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate the total ensuring price and quantity are numbers
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price) || 0; // Ensure price is a number
    console.log(price);
    const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a number
    console.log(quantity);
    return sum + price * quantity;
  }, 0);

  // Function to format cart details and send via WhatsApp
  const handleCheckout = () => {
    const message = cart
      .map(
        (item) =>
          `Product: ${item.name}, Size: ${item.size || "N/A"}, Price: ₦${
            item.price
          }, Quantity: ${item.quantity}`
      )
      .join("\n");

    const whatsappMessage = `I would like to purchase the following items:\n\n${message}\n\nTotal: ₦${total.toFixed(
      2
    )}`;

    // Redirect to WhatsApp with pre-filled message
    const phoneNumber = "+2349043970401"; // Replace with the client's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen p-6 mt-25">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-white rounded shadow"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>
                  ${item.price} x {item.quantity}
                </p>
                {item.size && <p>Size: {item.size}</p>}
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-lg font-bold">
            Total: ${total.toFixed(2)}
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
