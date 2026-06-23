import { useState } from "react";
import axios from "axios";

export default function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    coverLetter: "",
    resumeLink: "",
    expectedSalary: "",
    portfolio: "",
    linkedIn: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://jobportalbackend-4vft.onrender.com/api/applications/apply",
        { jobId: job._id, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Application submitted successfully!");
      setForm({
        coverLetter: "",
        expectedSalary: "",
        portfolio: "",
        linkedIn: "",
      });
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
      <div className="bg-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Apply for {job.role}</h2>

        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          placeholder="Write your cover letter..."
          className="w-full bg-black border border-[#8a2be2] rounded-lg p-2 mb-4"
          rows="5"
        ></textarea>

        <input
          type="text"
          name="expectedSalary"
          value={form.expectedSalary}
          onChange={handleChange}
          placeholder="Expected Salary"
          className=" bg-black w-full border border-[#8a2be2] rounded-lg p-2 mb-3"
        />

        <input
          type="text"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio Website"
          className="w-full bg-black border border-[#8a2be2] rounded-lg p-2 mb-3"
        />

        <input
          type="text"
          name="linkedIn"
          value={form.linkedIn}
          onChange={handleChange}
          placeholder="LinkedIn Profile"
          className="w-full bg-black border border-[#8a2be2] rounded-lg p-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleApply}
            className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white rounded-lg transition"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#8a2be2] hover:bg-[#8a2be2] text-white rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
