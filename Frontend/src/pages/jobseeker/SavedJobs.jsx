import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyModal from "./ApplyModal";
import JobDetails from "./jobDetails";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("token")) return;
      try {
        const res = await axios.get("http://localhost:5000/api/saved-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);
  const [applyJob, setApplyJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  if (loading)
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_10px_#8a2be2] mb-6">
        Saved Jobs
      </h1>
      {jobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={() => setApplyJob(job)}
              onDetails={() => setSelectedJob(job)}
            />
          ))}
        </div>
      )}
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
