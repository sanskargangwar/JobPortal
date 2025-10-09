// src/context/SavedJobsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SavedJobsContext = createContext();

export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]); // array of job _id
  const { token } = useAuth();

  // Fetch saved jobs on mount
  useEffect(() => {
    if (!token) return;
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/saved-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedJobs(res.data.map((job) => job._id)); // store only IDs
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedJobs();
  }, [token]);

  // Toggle Save/Unsave
  const toggleSave = async (jobId) => {
    if (!token) return;
    try {
      const isSaved = savedJobs.includes(jobId);
      const url = `http://localhost:5000/api/saved-jobs/${jobId}`;
      if (isSaved) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedJobs(savedJobs.filter((id) => id !== jobId));
      } else {
        await axios.post(
          url,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSavedJobs([...savedJobs, jobId]);
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSave }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => useContext(SavedJobsContext);
