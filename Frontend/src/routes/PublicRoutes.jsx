import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoutes({ children }) {
  const { user, token } = useAuth();

  // If already logged in, redirect away (to dashboard or home)
  if (token && user) {
    // you can check role here if needed (jobseeker vs recruiter)
    if (user.role === "recruiter") {
      return <Navigate to="/recruiter/dashboard" replace />;
    }
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}
