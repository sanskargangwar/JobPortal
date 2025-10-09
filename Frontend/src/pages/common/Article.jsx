import { useParams } from "react-router-dom";
import { articles } from "./Home";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return (
      <div className="text-center text-red-500 p-10">Article not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-10 flex flex-col items-center">
      {/* Image Section */}
      <div className="relative w-full max-w-4xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-2xl shadow-[0_0_25px_#8a2be2] object-contain max-h-[500px] transition-transform duration-500 hover:scale-[1.02]"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent"></div>
      </div>

      {/* Text Section */}
      <div className="max-w-3xl mt-10 text-center">
        <h1 className="text-5xl font-extrabold text-purple-400 drop-shadow-[0_0_10px_rgba(138,43,226,0.8)] leading-snug">
          {article.title}
        </h1>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed tracking-wide">
          {article.description}
        </p>
      </div>
    </div>
  );
}
