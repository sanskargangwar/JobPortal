import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!localStorage.getItem("token")) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://jobportalbackend-4vft.onrender.com/api/applications/recruiter/applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://jobportalbackend-4vft.onrender.com/api/applications/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://jobportalbackend-4vft.onrender.com/api/saved-applications/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Application saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save application.");
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
        Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-400">No applications found.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
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

              {/* Status Badge */}
              <div className="mt-4">
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
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(app._id, "shortlisted")}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleSave(app._id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
