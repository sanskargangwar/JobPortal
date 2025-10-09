import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation(); // <-- get current route

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path, newTab = false) => {
    if (newTab) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
      setIsOpen(false);
    }
  };

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-gray-300 px-6 py-4 flex justify-between items-center shadow-[0_0_15px_#8a2be2]">
      <div className="text-2xl font-bold text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
        Job<span className="text-white">X</span>
      </div>

      <div className="space-x-4">
        <ul className="flex gap-4 items-center">
          {/* Job Seeker Links */}
          {user?.role === "job-seeker" && (
            <>
              <Link
                to="/user/dashboard"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/user/dashboard")
                    ? "text-[#8a2be2]"
                    : "text-gray-300"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/foryou"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/foryou") ? "text-[#8a2be2]" : "text-gray-300"
                }`}
              >
                For You
              </Link>
              <Link
                to="/jobs"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/jobs") ? "text-[#8a2be2]" : "text-gray-300"
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/user/applied-jobs"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/user/applied-jobs")
                    ? "text-[#8a2be2]"
                    : "text-gray-300"
                }`}
              >
                Applied Jobs
              </Link>
            </>
          )}

          {/* Recruiter Links */}
          {user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/post-job"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/recruiter/post-job")
                    ? "text-[#8a2be2]"
                    : "text-gray-300"
                }`}
              >
                Post a Job
              </Link>
              <Link
                to="/recruiter/my-jobs"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/recruiter/my-jobs")
                    ? "text-[#8a2be2]"
                    : "text-gray-300"
                }`}
              >
                My Jobs
              </Link>
              <Link
                to="/recruiter/applications"
                className={`hover:drop-shadow-[0_0_8px_#8a2be2] ${
                  isActive("/recruiter/applications")
                    ? "text-[#8a2be2]"
                    : "text-gray-300"
                }`}
              >
                Applications
              </Link>
            </>
          )}

          {/* Avatar & Dropdown */}
          {user && (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={user.profilePicture || "profile-logo.jpg"}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-[#8a2be2] shadow-[0_0_10px_#8a2be2]"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-[#8a2be2] rounded-lg shadow-[0_0_15px_#8a2be2] z-50">
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#8a2be2]/20 hover:text-white"
                  >
                    Profile
                  </button>
                  {user?.role === "job-seeker" && (
                    <button
                      onClick={() => handleNavigate("/user/saved-jobs")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-[#8a2be2]/20 hover:text-white"
                    >
                      Saved Jobs
                    </button>
                  )}
                  {user?.role === "recruiter" && (
                    <button
                      onClick={() =>
                        handleNavigate("/recruiter/saved-applications")
                      }
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-[#8a2be2]/20 hover:text-white"
                    >
                      Saved Applications
                    </button>
                  )}
                  <button
                    onClick={() => handleNavigate("/about-us", true)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#8a2be2]/20 hover:text-white"
                  >
                    About Us
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
