import { Link } from "react-router-dom";
export default function TempNavbar() {
  return (
    <nav className="bg-black text-gray-300 px-6 py-4 flex justify-between items-center shadow-[0_0_15px_#8a2be2]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
          Job<span className="text-white">X</span>
        </div>
      </div>
      <div className="space-x-4">
        <Link
          to="/"
          className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_8px_#8a2be2]"
        >
          Register
        </Link>
        <Link to="/recruiter/login" className=" hover:text-red-600">
          Recruiter
        </Link>
      </div>
    </nav>
  );
}
