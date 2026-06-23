import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://jobportalbackend-4vft.onrender.com/api/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first render
  useEffect(() => {
    if (token) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
    }
    setLoading(false);
  }, [token]);

  // Sync localStorage whenever user or token changes
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // ================== LOGIN ==================
  const loginJobSeeker = async (email, password) => {
    const res = await axios.post(
      `${API_URL}/jobseeker/login`,
      { email, password },
      { withCredentials: true }
    );
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };
  // ================== LOGIN (recruiter)==================
  const loginRecruiter = async (email, password, companyName) => {
    const res = await axios.post(
      `${API_URL}/recruiter/login`,
      { email, password, companyName },
      { withCredentials: true }
    );
    setToken(res.data.token);
    setUser(res.data.user);
    console.log("LOGIN USER:", res.data.user);
    return res.data;
  };
  // ================== REGISTER (Job-Seeker) ==================
  const registerJobSeeker = async (username, email, password) => {
    const res = await axios.post(
      `${API_URL}/register/job-seeker`,
      { username, email, password },
      { withCredentials: true }
    );
    return res.data; // returns only message, no token
  };

  // ================== REGISTER (Recruiter) ==================
  const registerRecruiter = async (username, email, password, companyName) => {
    const res = await axios.post(
      `${API_URL}/register/recruiter`,
      { username, email, password, companyName },
      { withCredentials: true }
    );
    return res.data; // returns only message, no token
  };

  // ================== LOGOUT ==================
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginJobSeeker,
        logout,
        loginRecruiter,
        registerJobSeeker,
        registerRecruiter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
