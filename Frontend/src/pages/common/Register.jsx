import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function Register() {
  const { registerJobSeeker } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerJobSeeker(username, email, password);
      alert("Registration successful! Redirecting to login...");
      setLoading(false);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      setLoading(false);
      setError(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div>
      {loading ? <LoadingSpinner /> : <></>}
      <div
        className="flex justify-end items-center"
        style={{
          backgroundImage: `url(login.png)`,
          height: "100vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          fontFamily: "'Noto Serif', serif",
          imageRendering: "auto",
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
                Register Now
              </h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8a2be2] bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-black text-white font-semibold drop-shadow-[0_0_10px_#8a2be2] rounded-lg hover:bg-[#8a2be2] transition"
              >
                Register
              </button>
            </form>
            {message && (
              <p className="mt-3 text-center text-sm text-white">{message}</p>
            )}
            <p className="text-center text-sm text-gray-500 mt-6">
              Did You have an account?{" "}
              <Link
                to="/login"
                className="text-[#8a2be2] hover:underline hover:text-blue-600"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
