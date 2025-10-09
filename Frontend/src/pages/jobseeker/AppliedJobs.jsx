import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/applications/recently-applied",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );

  if (!applications.length)
    return <div className="text-center py-10">No applications found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_10px_#8a2be2] mb-6">
        Applied Jobs
      </h1>
      {applications.map((app) => {
        const isExpanded = expandedIds.includes(app._id);
        return (
          <div
            key={app._id}
            className="p-6  border border-[#8a2be2] text-white rounded-lg transition rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            {/* Job Info + Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_#8a2be2]">
                  {app.job?.title}
                </h2>
                <p className="text-white-600 mt-1">
                  Company:{" "}
                  <span className="text-[#8a2be2] font-medium">
                    {app.job?.companyName}
                  </span>
                </p>
                <p className="text-white-600">
                  Location:{" "}
                  <span className=" text-[#8a2be2] font-medium">
                    {app.job?.location}
                  </span>
                </p>
                {app.job?.role && (
                  <p className="text-gray-600">
                    Role: <span className="font-medium">{app.job.role}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col md:items-end mt-4 md:mt-0 space-y-2">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border border-[#8a2be2] ${
                    app.status === "applied"
                      ? " text-yellow-500"
                      : app.status === "reviewed"
                      ? " text-blue-500"
                      : app.status === "shortlisted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {app.status.toUpperCase()}
                </span>

                {/* View More Button on Right */}
                <button
                  onClick={() => toggleExpand(app._id)}
                  className="flex items-center gap-1 text-[#8a2be2] font-semibold hover:text-[#8a2be2] transition-colors duration-300"
                >
                  {isExpanded ? "Hide Details" : "View More"}
                  {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </button>
              </div>
            </div>

            {/* Collapsible Details */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-[2000px] mt-4" : "max-h-0"
              }`}
            >
              <div className="border-t pt-4 space-y-3">
                {/* Application Details */}
                <h3 className="text-lg font-semibold text-white mt-4">
                  Application Details
                </h3>
                {app.coverLetter && (
                  <p className="text-[#8a2be2] mt-1">
                    <span className="text-white font-medium">
                      Cover Letter:
                    </span>{" "}
                    {app.coverLetter}
                  </p>
                )}
                {app.availability && (
                  <p className="text-gray-600">
                    <span className="font-medium">Availability:</span>{" "}
                    {app.availability}
                  </p>
                )}
                {app.expectedSalary && (
                  <p className="text-[#8a2be2] mt-1">
                    <span className="text-white font-medium">
                      Expected Salary:
                    </span>{" "}
                    ${app.expectedSalary}
                  </p>
                )}
                {app.preferredLocation && (
                  <p className="text-gray-600">
                    <span className="font-medium">Preferred Location:</span>{" "}
                    {app.preferredLocation}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppliedJobs;
