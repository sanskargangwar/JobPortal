import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center">
      <h1 className="text-6xl font-bold text-white drop-shadow-[0_0_10px_#8a2be2]">
        404
      </h1>
      <p className="text-gray-600 mt-2">
        The page{" "}
        <span className="font-semibold text-red-500">{location.pathname}</span>{" "}
        was not found.
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="border border-[#8a2be2] text-white drop-shadow-[0_0_10px_#8a2be2] py-2 px-4 rounded-lg hover:bg-[#8a2be2] transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
