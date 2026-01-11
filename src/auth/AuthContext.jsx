

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");

  // ✅ Login function
  const login = (userData) => {
    console.log("UserData received in login:", userData);

    setIsAuthenticated(true);
    setUser(userData);
    setUserId(userData.id);
    setEmail(userData.email);

    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("userId", userData.id);
    sessionStorage.setItem("email", userData.email);

    console.log("Session Storage after login:", sessionStorage.getItem("email"));
  };

  // ✅ Logout function
  const logout = () => {
    console.log("Logging out...");

    setIsAuthenticated(false);
    setUser(null);
    setUserId(null);
    setEmail("");

    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");

    console.log("Session Storage after logout:", sessionStorage.getItem("email"));
  };

  // ✅ Restore session from storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.id);
      setEmail(parsedUser.email || "");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userId, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
