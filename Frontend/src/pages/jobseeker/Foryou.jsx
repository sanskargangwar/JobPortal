import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Foryou() {
  const { user, token } = useAuth();
  const [hasResume, setHasResume] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fetchingResume, setFetchingResume] = useState(false);
  const [userId, setUserId] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [fetchingJobs, setFetchingJobs] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user || !token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("https://jobportalbackend-4vft.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasResume(!!response.data.resume);
        setUserId(response.data._id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [user, token]);

  // Fetch recommended jobs after userId is available and resume exists
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      if (!userId) return;
      try {
        setFetchingResume(true);
        const response = await axios.post(
          "https://jobportalbackend-4vft.onrender.com/recommend-jobs",
          { userId }
        );
        setRecommendedJobs(response.data.recommendedJobs || []);
      } catch (err) {
        console.error("Error fetching recommended jobs:", err);
      } finally {
        setFetchingResume(false);
      }
    };

    fetchRecommendedJobs();
  }, [userId]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://jobportalbackend-4vft.onrender.com/api/resume/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setHasResume(true);
      setFile(null);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error uploading resume");
    } finally {
      setUploading(false);
    }
  };

  const handleOpenResume = () => {
    if (!userId) return;
    window.open(`/resume/${userId}`, "_blank");
  };

  if (loading || fetchingResume) return <Spinner />;

  return (
    <>
      <h1 className="items-center text-xl font-bold text-white drop-shadow-[0_0_10px_#8a2be2] flex items-center gap-2">
        AI Recommended Jobs
      </h1>

      {/* Resume Section */}
      {hasResume ? (
        <div className="mt-4">
          <p className="text-white mt-2">Your resume is uploaded.</p>
          <button
            onClick={handleOpenResume}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            disabled={fetchingResume}
          >
            {fetchingResume ? "Fetching..." : "View Resume"}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-white">
            Upload Your Resume
          </h2>
          <form onSubmit={handleUpload} className="mt-2">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="text-white"
            />
            <button
              type="submit"
              disabled={uploading}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
          {message && <p className="mt-2 text-white">{message}</p>}
        </div>
      )}

      {/* Recommended Jobs Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">
          Recommended Jobs for You
        </h2>

        {fetchingJobs ? (
          <Spinner />
        ) : recommendedJobs.length === 0 ? (
          <p className="text-white">No recommended jobs found.</p>
        ) : (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job._id}
                className="p-4 bg-gray-800 rounded shadow hover:shadow-lg transition duration-200"
              >
                <h3 className="text-white font-semibold">{job.title}</h3>
                <p className="text-gray-300">{job.description}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {job.location} | Experience: {job.experience || "N/A"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Score: {job.score.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
