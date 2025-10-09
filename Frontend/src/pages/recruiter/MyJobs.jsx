import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  MdOutlineWork,
  MdLocationOn,
  MdDelete,
  MdAccessTime,
} from "react-icons/md";
export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      if (!localStorage.getItem("token")) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted job from state
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  const [filterText, setFilterText] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter((job) =>
    job.role.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_10px_#8a2be2] mb-6">
        My Jobs
      </h1>
      {loading ? <LoadingSpinner /> : <></>}
      {/* Filter Input */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by role..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border border-[#8a2be2] bg-black  rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#8a2be2]"
        />
      </div>

      {/* Jobs List */}
      <div className="max-w-4xl mx-auto grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-black shadow-[0_0_10px_#8a2be2] rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-white drop-shadow-[0_0_10px_#8a2be2] flex items-center gap-2">
                <MdOutlineWork className="text-blue-500" /> {job.role}
              </h2>
              <p className="text-gray-600 mt-2">{job.company}</p>
              <p className="flex items-center mt-2 text-gray-500">
                <MdLocationOn className="mr-1" /> {job.location}
              </p>
              <p className="flex items-center mt-2 text-gray-500">
                <MdAccessTime className="mr-1" /> {job.experience}
              </p>
              <p className="text-gray-500 mt-2">{job.description}</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-4 py-2 border  border-[#8a2be2] text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
                >
                  <MdDelete /> Delete
                </button>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-4 py-2 border border-[#8a2be2]  text-white rounded-lg hover:bg-blue-700"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[700px] h-[400px] p-6 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-bold mb-2">{selectedJob.role}</h2>
            <p className="text-gray-700 mb-1">{selectedJob.company}</p>
            <p className="flex items-center text-gray-500">
              <MdLocationOn className="mr-1" /> {selectedJob.location}
            </p>
            <p className="flex items-center text-gray-500">
              <MdAccessTime className="mr-1" /> {selectedJob.experience}
            </p>
            <p className="mt-4 text-gray-600">{selectedJob.description}</p>

            <div className="fixed absolute top-0 right-1 mb-2 mt-4 flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-red-500"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
