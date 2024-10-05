import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create Context to check if the user is logged in
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to check token validity
  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        return false;
      }
      setIsAuthenticated(true);
      return true;
    }
    setIsAuthenticated(false);
    return false;
  };

  useEffect(() => {
    const isValid = checkTokenExpiry();
    if (!isValid) {
      navigate("/signin"); // Redirect if token expired
    }
  }, [navigate]);

  const login = (token, callback) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    callback();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
