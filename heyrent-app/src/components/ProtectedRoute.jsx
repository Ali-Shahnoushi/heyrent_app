import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />;
      </div>
    );

  if (isAuthenticated) return children;
}
