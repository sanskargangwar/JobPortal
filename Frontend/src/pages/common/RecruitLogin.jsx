import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Lock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Office = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
    <path d="M8 8h.01" />
    <path d="M16 8h.01" />
    <path d="M8 16h.01" />
    <path d="M16 16h.01" />
  </svg>
);

export default function RecruitLogin() {
  const navigate = useNavigate();
  const { loginRecruiter, registerRecruiter } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCompany, setLoginCompany] = useState("");

  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerCompany, setRegisterCompany] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const companyName = loginCompany.trim().toLowerCase();
      await loginRecruiter(loginEmail, loginPassword, companyName);
      console.log("Login successful");
      setLoading(false);
      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const companyName = registerCompany.trim().toLowerCase();
      await registerRecruiter(
        username,
        registerEmail,
        registerPassword,
        companyName
      );
      console.log("Register successful");
      setLoading(false);
      alert("registered Redirecting to Login");
      setIsRegister(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : <></>}
      <div className="min-h-screen flex items-center justify-center p-4 h-full bg-gradient-to-br from-black via-[#1a001f] to-[#3d0075] p-8 text-center shadow-[0_0_20px_#8a2be2]">
        <div className="w-full max-w-md p-8 space-y-6 bg-black border border-[#8a2be2] rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white ">
              {isRegister ? "Recruiter Register" : "Recruiter Login"}
            </h1>
            <p className="mt-2 text-[#8a2be2]">
              How are you today.
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </p>
          </div>
          {!isRegister && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Office className="text-sky-400" />
                </div>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="companyname"
                  autoComplete="companyname"
                  value={loginCompany}
                  onChange={(e) => setLoginCompany(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-[#8a2be2]" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-sky-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 focus:ring-offset-sky-200 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              >
                Login
              </button>
            </form>
          )}
          {isRegister && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-sky-400" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-sky-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-sky-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Office className="text-sky-400" />
                </div>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={registerCompany}
                  onChange={(e) => setRegisterCompany(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 focus:ring-offset-sky-200 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              >
                Register
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsRegister(!isRegister);
              }}
              className="text-blue-600 hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
