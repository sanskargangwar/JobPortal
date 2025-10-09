import { useState } from "react";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Overview", icon: <FiBarChart2 /> },
    { name: "Revenue", icon: <FiBarChart2 /> },
    { name: "Settings", icon: <FiSettings /> },
    { name: "Profile", icon: <FiUser /> },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-purple-900 flex flex-col p-5 shadow-xl shadow-purple-700/20">
        <h1 className="text-2xl font-bold text-purple-400 mb-8">CAWAR</h1>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition 
                ${
                  active === item.name
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40"
                    : "text-gray-400 hover:bg-purple-900 hover:text-white"
                }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <button className="mt-auto flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400">
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Navbar */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/50">
            Take Free Trial
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 p-6 rounded-2xl shadow-lg shadow-purple-500/40">
            <h3 className="text-lg font-semibold mb-2">Visibility</h3>
            <div className="h-40 bg-purple-950 rounded-lg flex items-center justify-center">
              <span className="text-purple-400">[Chart Here]</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 p-6 rounded-2xl shadow-lg shadow-purple-500/40">
            <h3 className="text-lg font-semibold mb-2">SEO Score</h3>
            <p className="text-3xl font-bold text-purple-400">82%</p>
            <p className="text-sm text-gray-400">Based on daily analysis</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 p-6 rounded-2xl shadow-lg shadow-purple-500/40">
            <h3 className="text-lg font-semibold mb-2">User Tracking</h3>
            <p className="text-3xl font-bold text-purple-400">14 Active</p>
            <p className="text-sm text-gray-400">1,485 Events</p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 p-6 rounded-2xl shadow-lg shadow-purple-500/40">
            <h3 className="text-lg font-semibold mb-2">Country Data View</h3>
            <div className="h-48 bg-purple-950 rounded-lg flex items-center justify-center">
              <span className="text-purple-400">[Map / Graph]</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 p-6 rounded-2xl shadow-lg shadow-purple-500/40">
            <h3 className="text-lg font-semibold mb-2">Daily Average</h3>
            <p className="text-5xl font-bold text-purple-400">9.3</p>
          </div>
        </div>
      </main>
    </div>
  );
}
