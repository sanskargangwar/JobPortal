import Footer from "../../layouts/Footer";
export default function About() {
  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-[0_0_10px_#8a2be2]">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re on a mission to connect job seekers and companies through the
            power of <span className="font-semibold">AI-driven hiring</span>.
            Our platform personalizes opportunities, speeds up hiring, and
            ensures better matches for everyone.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To revolutionize recruitment by making it faster, smarter, and
              fairer with the help of AI. We aim to empower job seekers with
              personalized career paths and enable employers to find the right
              talent efficiently.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To become the world’s most trusted AI-driven hiring platform —
              where every individual finds the right job, and every company
              discovers the right talent, powered by intelligent automation.
            </p>
          </div>
        </section>

        {/* Stats / Impact */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">10k+</h3>
            <p className="text-gray-600 mt-1">Active Job Seekers</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">2k+</h3>
            <p className="text-gray-600 mt-1">Companies Hiring</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-blue-600">5k+</h3>
            <p className="text-gray-600 mt-1">Successful Placements</p>
          </div>
        </section>

        {/* Team / AI-driven approach */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            At AI JobHub, we blend human expertise with cutting-edge AI
            technology to ensure smarter matches. Our platform learns from your
            preferences, skills, and career goals to recommend opportunities
            that truly matter.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
