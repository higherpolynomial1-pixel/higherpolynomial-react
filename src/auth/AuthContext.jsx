

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Login function
  const login = (userData, userToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  // ✅ Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Restore session from storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // ✅ Global Fetch Interceptor
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      let [resource, config] = args;

      // Inject Token
      if (token) {
        config = config || {};
        config.headers = config.headers || {};
        // Handle both simple object headers and Headers object
        if (config.headers instanceof Headers) {
          config.headers.set('Authorization', `Bearer ${token}`);
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      try {
        const response = await originalFetch(resource, config);

        // Handle Session Expiry
        if (response.status === 401) {
          logout();
          // Optional: Display toast if you have access to toast here, 
          // or just rely on the redirect that usually happens when isAuthenticated becomes false
        }

        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
