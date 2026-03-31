import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth.js";

const useProtectedRoute = (redirectPath = "/login") => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, isLoading, navigate, redirectPath]);

  return { isAuthenticated, isLoading };
};

export default useProtectedRoute;
