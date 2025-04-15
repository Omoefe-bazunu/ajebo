import React, { createContext, useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, logout } = useContext(AppContext);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on user change
  useEffect(() => {
    const key = user ? `cart_${user.uid}` : "guest_cart";
    const storedCart = JSON.parse(localStorage.getItem(key)) || [];
    setCart(storedCart);
  }, [user]);

  // Save cart to localStorage on cart or user change
  useEffect(() => {
    const key = user ? `cart_${user.uid}` : "guest_cart";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const exists = prevCart.find(
        (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
      );

      if (exists) {
        return prevCart.map((item) =>
          item.id === itemToAdd.id && item.size === itemToAdd.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`cart_${user.uid}`);
    }
    logout();
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        handleLogout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
