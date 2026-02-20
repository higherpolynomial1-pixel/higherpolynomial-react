
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Global token storage for the fetch interceptor (avoids lifecycle timing issues)
let globalToken = localStorage.getItem("token") || null;
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  let [resource, config] = args;
  const url = typeof resource === 'string' ? resource : resource.url;

  // Only inject token for our own API requests
  const isOurApi = url.includes('localhost:3000') ||
    url.includes('higherpolynomial-node.vercel.app') ||
    url.includes('higherpolynomial.com');

  if (globalToken && isOurApi) {
    console.log("[Fetch Interceptor] Injecting token for:", url);
    config = config || {};
    config.headers = config.headers || {};

    if (config.headers instanceof Headers) {
      config.headers.set('Authorization', `Bearer ${globalToken}`);
    } else {
      config.headers['Authorization'] = `Bearer ${globalToken}`;
    }
  }

  try {
    const response = await originalFetch(resource, config);
    if (response.status === 401 && isOurApi) {
      console.log("[Fetch Interceptor] 401 Unauthorized for:", url);
      // We can't easily call logout() here because it's outside the component,
      // but the component itself should handle the 401 by checking its context or re-auth flow.
    }
    return response;
  } catch (error) {
    throw error;
  }
};

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
    globalToken = userToken; // Update the global interceptor token

    console.log("AuthContext: Login called. Token Version Updated");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  // ✅ Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    globalToken = null; // Clear the global interceptor token

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Restore session from storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
      globalToken = storedToken;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
