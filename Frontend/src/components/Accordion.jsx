import { useState } from "react";

const accordionData = [
  {
    title: "What is AI Job Platform?",
    content:
      "AI Job Platform is an intelligent job search tool that matches candidates with the best opportunities using AI-powered algorithms.",
  },
  {
    title: "How does it work?",
    content:
      "We analyze your resume, skills, and career goals to provide personalized job recommendations and connect you with recruiters.",
  },
  {
    title: "Is it free to use?",
    content:
      "Yes! Our core job-matching services are completely free for job seekers.",
  },
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_12px_#8a2be2] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className={`border border-[#8a2be2] rounded-lg bg-black shadow-sm transition duration-300 ${
                activeIndex === index
                  ? "border-purple-500 shadow-purple-500/40"
                  : "border-blue-200"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-white drop-shadow-[0_0_12px_#8a2be2] font-medium focus:outline-none rounded-lg transition"
              >
                {item.title}
                <span
                  className={`transform transition-transform duration-300 text-white drop-shadow-[0_0_12px_#8a2be2] text-xl font-bold`}
                >
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-3 text-white text-sm">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
