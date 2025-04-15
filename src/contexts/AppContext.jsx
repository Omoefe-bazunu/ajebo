import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../lib/firebase";
import { toast } from "react-toastify";

const db = getFirestore(app);
const auth = getAuth(app);

export const AppContext = createContext();

// This wrapper component ensures stable context value
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [cateringItems, setCateringItems] = useState([]);
  const [fashionItems, setFashionItems] = useState([]);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [cateringSnapshot, fashionSnapshot] = await Promise.all([
          getDocs(collection(db, "cateringItems")),
          getDocs(collection(db, "fashionItems")),
        ]);

        setCateringItems(
          cateringSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setFashionItems(
          fashionSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load products");
      }
    };

    fetchItems();
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          setUser(currentUser);
          setCart(userDoc.exists() ? userDoc.data().cart || [] : []);
        } catch (error) {
          console.error("Error loading user data:", error);
          toast.error("Failed to load user data");
        }
      } else {
        setUser(null);
        setCart([]);
      }
    });

    return unsubscribe;
  }, []);

  // Auth methods using useCallback for stability
  const signup = useCallback(async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = res.user;
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        cart: [],
      });
      toast.success("Signup successful!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCart([]);
      toast.info("Logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  }, []);

  const addToCart = useCallback(
    async (item) => {
      if (!user) {
        toast.error("Please log in to add items to your cart.");
        return false;
      }

      try {
        const alreadyInCart = cart.some((i) => i.id === item.id);
        if (alreadyInCart) {
          toast.info("Item is already in the cart.");
          return false;
        }

        const newCart = [...cart, item];
        setCart(newCart);
        await updateDoc(doc(db, "users", user.uid), { cart: newCart });
        toast.success("Item added to cart.");
        return true;
      } catch (error) {
        toast.error("Failed to add item to cart");
        return false;
      }
    },
    [cart, user]
  );

  // Stable context value
  const contextValue = {
    cart,
    user,
    cateringItems,
    fashionItems,
    signup,
    login,
    logout,
    addToCart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Named export for the context itself
export { AppContext as default };
