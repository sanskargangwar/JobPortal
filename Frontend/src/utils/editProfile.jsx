import { useState, useRef } from "react";
import { Edit3, X, Camera } from "lucide-react";
import axios from "axios";

const EditProfile = ({ user, setUser }) => {
  const [alertShown, setAlertShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    name: user.company?.name || "",
    website: user.company?.website || "",
    description: user.company?.description || "",
    location: user.profile?.location || "",
    about: user.profile?.about || "",
    experience: user.profile?.experience || "",
    skills: user.profile?.skills?.join(", ") || "",
    profilePicture: user.profilePicture || "", // NEW
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCompanyName = () => {
    if (!alertShown) {
      alert("Company Name cannot be changed");
      setAlertShown(true); // ensure it runs only once
    }
  };
  // Convert uploaded file -> Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleSave = async () => {
    try {
      const payload = {
        username: formData.username,
        profilePicture: formData.profilePicture, // send to backend
        profile: {
          location: formData.location,
          about: formData.about,
          experience: formData.experience,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0),
        },
        company: {
          name: formData.name,
          website: formData.website,
          description: formData.description,
        },
      };

      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setUser(res.data);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Update failed", err.response?.data || err.message);
    }
  };

  return (
    <div>
      {/* Profile Card */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full rounded-xl text-[#8a2be2] hover:text-blue-700  flex items-center justify-center gap-2 py-2"
      >
        <Edit3 size={16} />
      </button>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="flex flex-col items-center mb-4">
              <div
                className="relative group w-32 h-32 cursor-pointer"
                onClick={handleImageClick}
              >
                {/* Profile Image */}
                <img
                  src={formData.profilePicture || "profile-logo.jpg"}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-md"
                />

                {/* Overlay with Camera Icon */}
                <div
                  className="absolute inset-0 bg-black/50 rounded-lg 
          flex items-center justify-center opacity-0 
          group-hover:opacity-100 transition"
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="space-y-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-black border border-[#8a2be2] rounded-lg p-2"
              />
              {user.role === "recruiter" && (
                <>
                  <input
                    type="text"
                    name="webname"
                    value={formData.name}
                    onFocus={handleCompanyName}
                    placeholder="Website Name"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website Link"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Website Description"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />
                </>
              )}
              {user.role === "job-seeker" && (
                <>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />

                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="About you"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Skills (comma separated)"
                    className="w-full bg-black border border-[#8a2be2] border rounded-lg p-2"
                  />
                </>
              )}
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full bg-[#8a2be2] text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
