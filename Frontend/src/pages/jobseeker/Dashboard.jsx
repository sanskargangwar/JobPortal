import { Link } from "react-router-dom";
import google from "../../../assest/google.png";
import microsoft from "../../../assest/microsoft.png";
import amazon from "../../../assest/amazon.png";
import adobe from "../../../assest/adobe.png";
export default function JobSeekerDashboard() {
const company = [
  { name: "Google", logo: google },
  { name: "Microsoft", logo: microsoft },
  { name: "Amazon", logo: amazon },
  { name: "Adobe", logo: adobe },
];
  return (
    <div data-aos="fade-up" className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-10 py-20 flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {/* Left Text Section */}
        <div className="max-w-xl space-y-6 flex flex-col justify-center">
          <h2 className="text-5xl font-bold leading-tight">
            <span className="text-white drop-shadow-[0_0_10px_#8a2be2]">
              AI
            </span>{" "}
            Didn't Take Your Job. <br />
            But It Can Help You <span className="text-green-300">Get One.</span>
          </h2>
          <p className="text-lg text-gray-200">
            Access <span className="font-bold">1M+ unique job posts</span> and
            AI-powered tools to accelerate your path to senior roles.
          </p>

          <button
            className="px-6 py-3 rounded-lg font-semibold 
                   bg-[#8a2be2] text-white 
                   shadow-lg shadow-[#8a2be2]/60 
                   hover:bg-[#9b30ff] transition"
          >
            <Link to="/foryou">Find Jobs Using AI</Link>
          </button>

          <div className="flex items-center space-x-3 pt-4">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="user"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="user"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt="user"
              />
            </div>
            <div>
              <p className="text-yellow-300 font-semibold">★★★★★</p>
              <p className="text-sm">Loved by 943,154 users</p>
            </div>
          </div>
        </div>

        {/* Right Job Status + Job Cards */}
        <div className="flex flex-col justify-between flex-1 space-y-6">
          {/* Status Box */}
          <div className="bg-black text-white px-6 py-5 rounded-2xl drop-shadow-[0_0_10px_#8a2be2]">
            <p className="font-semibold">🔵 Running AIApply</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>✔️ Finding jobs</li>
              <li>✔️ Generating resume</li>
              <li>✔️ Generating cover letter</li>
              <li>✔️ Applying</li>
            </ul>
          </div>

          {/* Job Suggestions */}
          <div className="space-y-4">
            <div
              className="bg-black border border-[#8a2be2]/40 
                p-6 rounded-2xl 
                shadow-lg shadow-[#8a2be2]/50 
                hover:shadow-[#8a2be2]/80 transition"
            >
              <Link to="/jobs">
                <h3 className="text-[#8a2be2] font-bold">Engineering Jobs</h3>
              </Link>
              <p className="text-gray-300 text-sm">Full-time, Part-time</p>
            </div>
            <div
              className="bg-black border border-[#8a2be2]/40 
                p-6 rounded-2xl 
                shadow-lg shadow-[#8a2be2]/50 
                hover:shadow-[#8a2be2]/80 transition"
            >
              <Link to="/jobs">
                <h3 className="text-[#8a2be2] font-bold">Accountant Jobs</h3>
              </Link>
              <p className="text-gray-300 text-sm">Full-time</p>
            </div>

            <div
              className="bg-black border border-[#8a2be2]/40 
                p-6 rounded-2xl 
                shadow-lg shadow-[#8a2be2]/50 
                hover:shadow-[#8a2be2]/80 transition"
            >
              <Link to="/jobs">
                <h3 className="text-[#8a2be2] font-bold">
                  Social Media Manager
                </h3>
              </Link>
              <p className="text-gray-300 text-sm">Part-time, Remote</p>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Companies Section */}
      <section className="px-10 py-20 bg-gray-900 text-white">
  <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_0_10px_#8a2be2]">
    Top Companies Hiring
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {company.map((company, index) => (
      <div
        key={index}
        className="bg-black p-6 rounded-xl flex flex-col items-center shadow-lg shadow-[#8a2be2]/50 hover:shadow-[#8a2be2]/80 transition"
      >
        <img
          src={company.logo}
          alt={company.name}
          className="w-20 h-20 object-contain mb-4 bg-white p-2 rounded"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/80?text=Logo";
          }}
        />

        <p className="text-gray-300 font-semibold">
          {company.name}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* AI Insights Section */}
      <section className="px-10 py-20 bg-black text-white">
        <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-[0_0_10px_#8a2be2]">
          AI Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg shadow-[#8a2be2]/50 hover:shadow-[#8a2be2]/80 transition">
            <h3 className="text-xl font-bold text-green-300">1M+</h3>
            <p className="text-gray-300">Jobs Analyzed</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg shadow-[#8a2be2]/50 hover:shadow-[#8a2be2]/80 transition">
            <h3 className="text-xl font-bold text-green-300">500k+</h3>
            <p className="text-gray-300">AI-generated Resumes</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg shadow-[#8a2be2]/50 hover:shadow-[#8a2be2]/80 transition">
            <h3 className="text-xl font-bold text-green-300">200k+</h3>
            <p className="text-gray-300">Successful Applications</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-10 py-20 bg-gray-800 text-white">
        <h2 className="text-3xl font-bold mb-12 text-white drop-shadow-[0_0_10px_#8a2be2]">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alice", text: "AIApply helped me land my dream job!" },
            {
              name: "Bob",
              text: "The resume generator saved me weeks of work.",
            },
            {
              name: "Charlie",
              text: "Highly recommend to anyone looking for jobs efficiently.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-black p-6 rounded-xl shadow-lg shadow-[#8a2be2]/50 hover:shadow-[#8a2be2]/80 transition"
            >
              <p className="text-gray-300 mb-4">"{t.text}"</p>
              <p className="font-semibold text-[#8a2be2]">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-10 bg-black text-gray-400 text-center">
        <p>© 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}
