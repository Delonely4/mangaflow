import { useState, useEffect } from "react";
import axiosInstance from "../config/axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async (userToken) => {
    try {
      const response = await axiosInstance.get("/auth/me");

      setUser(response.data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        setToken(userToken);
        await fetchUserData(userToken);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    await fetchUserData(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      await fetchUserData(userToken);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    token,
    user,
    login,
    logout,
    refreshUser,
  };
};

export default useAuth;
