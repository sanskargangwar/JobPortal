import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SavedJobsProvider } from "./context/SavedJobs";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <AuthProvider>
      <SavedJobsProvider>
        <BrowserRouter>
          <div className="bg-gradient-to-br from-black via-[#1a001f] to-[#3d0075] shadow-[0_0_20px_#8a2be2]">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </SavedJobsProvider>
    </AuthProvider>
  );
}

export default App;
