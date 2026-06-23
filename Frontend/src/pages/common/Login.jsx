import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Login() {
  const { loginJobSeeker } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginJobSeeker(email, password);
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div
        className="flex justify-end items-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #8a2be2 100%)",
          height: "100vh",
          width: "100%",
          fontFamily: "'Noto Serif', serif",
        }}
      >
        <div className="p-12 rounded text-right mr-20 w-[500px] h-[600px]">
          <div className="bg-black rounded-2xl shadow-lg w-full max-w-md p-8">
            <div className="text-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="User avatar"
                className="w-20 h-20 mx-auto rounded-full border-4 border-blue-200"
              />

              <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_#8a2be2] mt-4">
                Hello User
              </h2>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <p className="text-gray-500 text-sm">
                Sign in to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  value={email}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  name="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <a href="#" className="text-[#8a2be2] hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-black text-white font-semibold drop-shadow-[0_0_10px_#8a2be2] rounded-lg hover:bg-[#8a2be2] transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#8a2be2] hover:underline hover:text-blue-600"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
