import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logOut } from "@/api/authApi";

function useAuth() {
  const [state, setState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  const navigate = useNavigate();

  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await getMe();
      console.log("Server data:", response.data.user);
      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: response.data.user,
        token,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        token: null,
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(
    async (token) => {
      localStorage.setItem("token", token);
      await fetchUserData(token);
    },
    [fetchUserData]
  );

  const logout = useCallback(async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      });
      navigate("/login");
    }
  }, [navigate]);

  const updateUser = useCallback((updatedUserData) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...updatedUserData,
      },
    }));
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [fetchUserData]);

  return {
    ...state,
    login,
    logout,
    updateUser,
    refreshUser: () => fetchUserData(state.token),
  };
}

export default useAuth;
