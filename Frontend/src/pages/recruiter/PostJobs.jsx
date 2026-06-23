import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    description: "",
    role: "",
    experience: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://jobportalbackend-4vft.onrender.com/api/jobs/post-job", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job Posted ✅");
      setLoading(false);
      setForm({
        title: "",
        companyName: "",
        location: "",
        description: "",
        role: "",
        experience: "",
        salary: "",
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to post job");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {loading ? <LoadingSpinner /> : <></>}
      <h1 className=" text-center text-2xl font-bold mb-6 text-white drop-shadow-[0_0_10px_#8a2be2]">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-[0_0_20px_#8a2be2] rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g. AI Engineer)"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          required
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white shadow-[0_0_10px_#8a2be2] px-4 py-2 rounded-lg hover:bg-[#8a2be2] transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
