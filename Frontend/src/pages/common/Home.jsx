import Accordion from "../../components/Accordion";
import Hero from "../../layouts/Hero";

const articles = [
  {
    title: "5 Ways AI is Changing Recruitment",
    description:
      "From automated resume screening to predictive hiring trends, discover how AI is reshaping the job market.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXh1770lUlx2FFjg3zyxsf8Ne7923KT9BFdw&s",
    link: "#",
  },
  {
    title: "Top Skills Employers Want in 2025",
    description:
      "AI-driven reports reveal the most in-demand skills for the coming years.",
    image:
      "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/66ea93f42c430e0dbc80dadc_66ea93dc3a3768abdda10153_What%2520are%2520the%2520Most%2520In-demand%2520Skills%2520in%2520India.webp",
    link: "#",
  },
  {
    title: "How to Make Your Resume AI-Friendly",
    description:
      "Learn how to structure and optimize your resume so it stands out in automated screenings.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpG4vFHIPCFhqKqtMRMbEpdxeOR5E1gyhsJw&s",
    link: "#",
  },
];

export default function Home() {
  const openArticle = (index) => {
    window.open(`/article/${index}`, "_blank");
  };
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col min-h-screen bg-black text-white"
    >
      <Hero />

      {/* Section Heading */}
      <h1 className="mt-8 text-3xl font-bold text-center text-white drop-shadow-[0_0_8px_#8a2be2]">
        Features and Trends
      </h1>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="https://www.shutterstock.com/image-vector/partnership-contactbusinessman-matching-cyborg-idea-600nw-2313780457.jpg"
              alt="AI Matching"
              className="rounded-lg shadow-[0_0_15px_#8a2be2]"
            />
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_6px_#8a2be2]">
                Smart AI Job Matching
              </h3>
              <p className="text-gray-300 mt-4">
                Our AI analyzes your skills and career goals, matching you with
                the most relevant opportunities. No more endless scrolling
                through irrelevant job listings.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <img
              src="https://media.istockphoto.com/id/2168505525/vector/flat-illustration-of-analyst-reviewing-performance-metrics-on-real-time-project-dashboard.jpg?s=612x612&w=0&k=20&c=N8fIjFUQ06VYG0HoHsFdW9FQ6dK_K8NWz5P3H_wwWZk="
              alt="Real-time Analytics"
              className="rounded-lg shadow-[0_0_15px_#8a2be2]"
            />
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_6px_#8a2be2]">
                Real-Time Job Market Insights
              </h3>
              <p className="text-gray-300 mt-4">
                Get up-to-date analytics on hiring trends, salary benchmarks,
                and skills demand to make informed career moves.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="https://cdnp1.stackassets.com/b46cefbacfcb0b1efd483058a705d0bbc07d1d53/store/c96255586ca1f8196903cab701bf3d32a47affb8b7b63d8bab4d0b6edce4/sale_21886_primary_image.jpg"
              alt="Resume Optimizer"
              className="rounded-lg shadow-[0_0_15px_#8a2be2]"
            />
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_6px_#8a2be2]">
                AI-Powered Resume Optimizer
              </h3>
              <p className="text-gray-300 mt-4">
                Optimize your resume to pass ATS (Applicant Tracking Systems)
                and increase your chances of landing interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-black py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_8px_#8a2be2] mb-8">
            Latest Insights & Career Tips
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={index}
                onClick={() => openArticle(index)}
                className="bg-black border border-[#8a2be2] rounded-lg overflow-hidden shadow-[0_0_10px_#8a2be2] hover:shadow-[0_0_18px_#8a2be2] transition cursor-pointer"
              >
                {/* Article Card */}
                <div className="bg-black border border-[#8a2be2] rounded-lg overflow-hidden shadow-[0_0_10px_#8a2be2] hover:shadow-[0_0_18px_#8a2be2] transition cursor-pointer">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#8a2be2] drop-shadow-[0_0_6px_#8a2be2]">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {article.description}
                    </p>
                    <span className="text-[#8a2be2] text-sm mt-3 inline-block hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Accordion />
    </div>
  );
}
export { articles };
