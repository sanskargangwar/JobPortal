import { useSavedJobs } from "../../context/SavedJobs";
import {
  MdOutlineWork,
  MdLocationOn,
  MdAccessTime,
  MdAttachMoney,
} from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

export default function JobCard({ job, onApply, onDetails }) {
  const { savedJobs = [], toggleSave } = useSavedJobs();
  const isSaved = savedJobs.includes(job._id);

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transform transition hover:-translate-y-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white drop-shadow-[0_0_10px_#8a2be2] flex items-center gap-2">
            <MdOutlineWork className="text-purple-500" />{" "}
            {job.role || "Job Role"}
          </h2>
          <p className=" flex items-center gap-2 mt-1">
            <FaBuilding className="text-white" /> {job.companyName || "Company"}
          </p>
        </div>

        {/* Save/Unsave Button */}
        <button
          onClick={() => toggleSave(job._id)}
          className={`px-4 py-2 rounded-lg text-white font-medium text-white drop-shadow-[0_0_10px_#8a2be2] transition ${
            isSaved
              ? "border border-[#8a2be2] hover:bg-[#8a2be2]"
              : "border border-[#8a2be2] hover:bg-[#8a2be2]"
          }`}
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
        <p className="flex items-center gap-2">
          <MdLocationOn className="text-red-500" /> {job.location || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <MdAccessTime className="text-purple-500" /> {job.experience || "N/A"}{" "}
          exp
        </p>
        <p className="flex items-center gap-2">
          <MdAttachMoney className="text-green-500" />{" "}
          {job.salary || "Not Disclosed"}
        </p>
      </div>

      {/* Description */}
      <p className="mt-4 text-white text-sm leading-relaxed line-clamp-3">
        {job.description || "No description provided."}
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={onApply}
          className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white drop-shadow-[0_0_10px_#8a2be2] rounded-lg transition"
        >
          Apply Now
        </button>
        <button
          onClick={onDetails}
          className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white drop-shadow-[0_0_10px_#8a2be2] rounded-lg transition"
        >
          Details
        </button>
      </div>
    </div>
  );
}
