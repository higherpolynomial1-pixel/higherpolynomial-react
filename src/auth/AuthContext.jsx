

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
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  // ✅ Login function
  const login = (userData, userToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(userToken);

    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userToken);
  };

  // ✅ Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  // ✅ Restore session from storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
