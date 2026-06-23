import { useEffect, useState } from "react";
import axios from "axios";
import Edit from "../../utils/editProfile";
import { Briefcase, MapPin, Mail, Globe } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
const Card = ({ children, className }) => (
  <div className={`bg-gray border rounded-xl ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("token")) return;

      try {
        const res = await axios.get("https://jobportalbackend-4vft.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
      }
    };

    fetchUser();
  }, []);

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-screen border border-[#8a2be2] p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Profile Card */}
        <Card className="col-span-1 shadow-xl rounded-2xl p-6 flex flex-col">
          <div className="flex flex-col items-center text-center">
            <div className="relative inline-block">
              {/* Profile Picture */}
              <img
                src={user.profilePicture || "profile-logo.jpg"}
                alt="Profile"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-[#8a2be2] shadow-md object-cover"
              />

              {/* Edit Button (bottom-right corner) */}
              <div className="absolute bottom-0 right-0">
                <Edit user={user} setUser={setUser} />
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mt-4 text-white drop-shadow-[0_0_10px_#8a2be2]">
              {user.username}
            </h2>
            <p className="text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]  font-medium capitalize">
              {user.role}
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-2 break-words text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
              <Mail size={16} className="text-blue-500" /> {user.email}
            </p>

            {/* Job-Seeker extra info */}
            {user.role === "job-seeker" && (
              <p className="flex items-center gap-2 text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
                <Briefcase size={16} className="text-blue-500" />{" "}
                {user.profile?.experience || "No experience"}
              </p>
            )}
            {/* Location → only for job-seeker */}
            {user.role === "job-seeker" && (
              <p className="flex items-center gap-2 mt-2 text-sm md:text-base text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
                <MapPin size={16} className="text-blue-500" />{" "}
                {user.profile?.location || "Not specified"}
              </p>
            )}

            {/* Recruiter extra info */}
            {user.role === "recruiter" && (
              <>
                <p className="flex items-center gap-2 text-[#8a2be2] drop-shadow-[0_0_10px_#8a2be2]">
                  <Briefcase size={16} className="text-blue-500" />{" "}
                  {user.company?.name}
                </p>
                <p className="flex items-center gap-2 truncate drop-shadow-[0_0_10px_#8a2be2]">
                  <Globe size={16} className="text-blue-500 shrink-0" />
                  <a
                    href={user.company?.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline truncate"
                  >
                    {user.company?.website}
                  </a>
                </p>
              </>
            )}
          </div>
        </Card>

        {/* Right Content */}
        <div className="col-span-2 space-y-6">
          {/* About */}
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-[0_0_10px_#8a2be2] mb-2">
                About
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                {user.role === "job-seeker"
                  ? user.profile?.about || "No about information"
                  : user.company?.description || "No company description"}
              </p>
            </CardContent>
          </Card>

          {/* Skills → only for Job-Seeker */}
          {user.role === "job-seeker" && (
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-[0_0_10px_#8a2be2] mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.profile?.skills?.length > 0 ? (
                    user.profile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#8a2be2] text-white drop-shadow-[0_0_10px_#8a2be2] rounded-full text-xs md:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className=" text-sm">No skills added</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.role === "job-seeker" && (
              <>
                <Card className="shadow-md rounded-2xl p-4 md:p-6 text-center">
                  <h4 className="text-sm md:text-lg font-semibold text-white drop-shadow-[0_0_10px_#8a2be2]">
                    Saved Jobs
                  </h4>
                  <p className="text-xl md:text-2xl font-bold">
                    {user.savedJobs?.length || 0}
                  </p>
                </Card>
                <Card className="shadow-md rounded-2xl p-4 md:p-6 text-center">
                  <h4 className="text-sm md:text-lg font-semibold text-white drop-shadow-[0_0_10px_#8a2be2]">
                    Applied
                  </h4>
                  <p className="text-xl md:text-2xl font-bold">
                    {user.appliedJobs?.length || 0}
                  </p>
                </Card>
              </>
            )}

            {user.role === "recruiter" && (
              <>
                <Card className="shadow-md rounded-2xl p-4 md:p-6 text-center col-span-2 md:col-span-1">
                  <h4 className="text-sm md:text-lg font-semibold text-white drop-shadow-[0_0_10px_#8a2be2]">
                    Posted Jobs
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {user.postedJobs?.length || 0}
                  </p>
                </Card>
                <Card className="shadow-md rounded-2xl p-4 md:p-6 text-center col-span-2 md:col-span-1">
                  <h4 className="text-sm md:text-lg font-semibold text-white drop-shadow-[0_0_10px_#8a2be2]">
                    Total Applications
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {user.applications?.length || 0}
                  </p>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
