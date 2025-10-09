import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyModal from "./ApplyModal";
import JobDetails from "./jobDetails";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/all-jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.role?.toLowerCase().includes(filterText.toLowerCase())
  );
  if (loading)
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="min-h-screen bg-black py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_10px_#8a2be2] mb-6">
        Available Jobs
      </h1>

      {/* Filter Input */}
      <div className="max-w-4xl mx-auto mb-6  border-[#8a2be2] ">
        <input
          type="text"
          placeholder="Search by role..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="bg-black border border-[#8a2be2] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white-400"
        />
      </div>

      {/* Jobs List */}
      <div className="max-w-4xl mx-auto grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={() => setApplyJob(job)}
              onDetails={() => setSelectedJob(job)}
            />
          ))
        ) : (
          <p className="text-center">No jobs found</p>
        )}
      </div>

      {/* Modals */}
      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(job) => {
            setApplyJob(job);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}
