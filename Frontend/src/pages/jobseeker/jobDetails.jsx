import { MdLocationOn, MdAccessTime, MdAttachMoney } from "react-icons/md";
import { FaBuilding, FaUserTie } from "react-icons/fa";

export default function JobDetails({ job, onClose, onApply }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-bold text-white">{job.role}</h2>
        <p className="flex items-center gap-2 text-lg text-white mt-1">
          <FaBuilding className="text-blue-500" /> {job.companyName}
        </p>

        {/* Job Info Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <p className="flex items-center gap-2">
            <MdLocationOn className="text-red-500" /> {job.location || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <MdAccessTime className="text-gray-500" /> {job.experience || "N/A"}{" "}
            exp.
          </p>
          <p className="flex items-center gap-2">
            <MdAttachMoney className="text-green-600" />{" "}
            {job.salary || "Not disclosed"}
          </p>
          <p className="flex items-center gap-2">
            <FaUserTie className="text-blue-500" /> Posted by:{" "}
            {job.postedBy?.username || "Recruiter"}
          </p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-semibold text-blue mb-2">Job Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {job.description || "No description available."}
          </p>
        </div>

        {/* Recruiter / Company Info */}
        {job.postedBy?.company?.name && (
          <div className="mt-6">
            <h3 className="font-semibold text-blue mb-2">About the Company</h3>
            <p className="text-gray-700 font-medium">
              {job.postedBy.company.name}
            </p>
            <p className="text-gray-600 text-sm">
              {job.postedBy.company.description}
            </p>
            {job.postedBy.company.website && (
              <a
                href={job.postedBy.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-1 inline-block"
              >
                Visit Website
              </a>
            )}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => onApply(job)}
            className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white rounded-lg transition"
          >
            Apply Now
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
