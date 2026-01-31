"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loggedInUser"));
    if (stored) setUser(stored);
  }, []);

  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateCart = (cart) => {
    if (!user) return;
    const updated = { ...user, cart };
    updateUser(updated);
  };


  const removeFromCart = (id, size, color) => {
    if (!user || !user.cart) return;

    const filtered = user.cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.size === size &&
          item.color === color
        )
    );

    const updated = { ...user, cart: filtered };
    updateUser(updated);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, updateCart, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
