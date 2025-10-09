import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#8a2be2] shadow-[0_0_15px_#8a2be2] mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-[#8a2be2] drop-shadow-[0_0_8px_#8a2be2] mb-3">
            Job X
          </h3>
          <p className="text-sm text-gray-300">
            Connecting job seekers and recruiters with AI-powered
            recommendations to make hiring smarter and faster.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#8a2be2] drop-shadow-[0_0_8px_#8a2be2] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                to="/foryou"
                className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/add-job"
                className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
              >
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-[#8a2be2] drop-shadow-[0_0_8px_#8a2be2] mb-3">
            Stay Updated
          </h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 border border-[#8a2be2] bg-black text-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8a2be2] shadow-[0_0_8px_#8a2be2]"
            />
            <button className="bg-[#8a2be2] text-white px-4 py-2 rounded-r-lg hover:shadow-[0_0_12px_#8a2be2] transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar with social icons */}
      <div className="border-t border-[#8a2be2] py-4 flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#8a2be2]">Job X</span>. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex space-x-5 mt-3 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#8a2be2] transition"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#8a2be2] transition"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-yadav01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#8a2be2] transition"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/aditya-yadav-18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#8a2be2] transition"
          >
            <FaGithub className="w-5 h-5" />
          </a>

          <a
            href="https://www.instagram.com/aditya.yaduvanshi_01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#8a2be2] transition"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
