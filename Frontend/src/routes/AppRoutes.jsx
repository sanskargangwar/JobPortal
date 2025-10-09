import { Routes, Route } from "react-router-dom";
import IndexLayout from "../layouts/IndexLayout";
import TempLayout from "../layouts/TempLayout";
import Home from "../pages/common/Home";
import NotFound from "../pages/common/NotFound.jsx";
import JobSeekerDashboard from "../pages/jobseeker/Dashboard";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import Login from "../pages/common/Login";
import SavedJobs from "../pages/jobseeker/SavedJobs.jsx";
import AppliedJobs from "../pages/jobseeker/AppliedJobs.jsx";
import Applications from "../pages/recruiter/Applications.jsx";
import SavedApplication from "../pages/recruiter/SavedApplication.jsx";
import MyJobs from "../pages/recruiter/MyJobs.jsx";
import PostJobs from "../pages/recruiter/PostJobs.jsx";
import About from "../pages/common/About.jsx";
import Article from "../pages/common/Article.jsx";
import Register from "../pages/common/Register";
import Resume from "../pages/common/Resume.jsx";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes.jsx";
import Profile from "../pages/common/Profile.jsx";
import RecruitLogin from "../pages/common/RecruitLogin.jsx";
import Foryou from "../pages/jobseeker/Foryou.jsx";
import Jobs from "../pages/jobseeker/Jobs.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {/* New User Layout */}
      <Route
        element={
          <PublicRoutes>
            <TempLayout />
          </PublicRoutes>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<RecruitLogin />} />
      </Route>

      {/* Main Layout with Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <IndexLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/user/saved-jobs" element={<SavedJobs />} />
        <Route path="/user/applied-jobs" element={<AppliedJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/foryou" element={<Foryou />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJobs />} />
        <Route path="/recruiter/my-jobs" element={<MyJobs />} />
        <Route path="/recruiter/applications" element={<Applications />} />
        <Route
          path="/recruiter/saved-applications"
          element={<SavedApplication />}
        />
      </Route>
      <Route path="/about-us" element={<About />} />
      <Route path="/resume/:userId" element={<Resume />} />
    </Routes>
  );
}
