import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SavedApplications() {
  const [loading, setLoading] = useState(true);
  const [savedApplications, setSavedApplications] = useState([]);

  useEffect(() => {
    const fetchSavedApplications = async () => {
      if (!localStorage.getItem("token")) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://jobportalbackend-4vft.onrender.com/api/saved-applications/recruiter/saved",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSavedApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedApplications();
  }, []);

  const handleUnsave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://jobportalbackend-4vft.onrender.com/api/saved-applications/${id}/save`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSavedApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_10px_#8a2be2]">
        Saved Applications
      </h1>

      {savedApplications.length === 0 ? (
        <p className="text-center text-gray-400">No saved applications.</p>
      ) : (
        <div className="grid gap-6">
          {savedApplications.map((app) => (
            <div
              key={app._id}
              className="p-6 bg-black rounded-2xl shadow-[0_0_15px_#8a2be2] hover:scale-[1.02] transition-transform"
            >
              {/* Job Info */}
              <div className="mb-4 border-b border-gray-700 pb-3">
                <h2 className="text-lg font-semibold text-purple-300">
                  {app.job?.title}{" "}
                  <span className="text-sm text-gray-400">
                    Posted By: {app.job?.companyName}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">{app.job?.location}</p>
              </div>

              {/* Applicant Info */}
              <div className="mb-4">
                <h3 className="text-md font-semibold text-white">
                  Applicant: {app.applicantName || app.applicant?.username}
                </h3>
                <p className="text-sm text-gray-400">
                  {app.applicantEmail || app.applicant?.email}
                </p>
                {app.applicantSkills?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Skills: {app.applicantSkills.join(", ")}
                  </p>
                )}
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  app.status === "applied"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "reviewed"
                    ? "bg-blue-100 text-blue-700"
                    : app.status === "shortlisted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>

              {/* Unsave Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleUnsave(app._id)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
                >
                  Remove from Saved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
