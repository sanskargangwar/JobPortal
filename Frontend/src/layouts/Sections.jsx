import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const Sections = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase className="text-blue-600 text-3xl" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-green-600 text-3xl" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-purple-600 text-3xl" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-red-600 text-3xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-6">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Find a job that suits
          </h1>
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mt-2">
            your interests and skills
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding
            careers.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="/heroS.jpg"
            alt="hero"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {details.map((element) => (
          <div
            key={element.id}
            className="bg-white rounded-lg shadow-md flex items-center gap-4 p-6 hover:shadow-lg transition"
          >
            <div className="p-4 bg-gray-100 rounded-full">{element.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {element.title}
              </p>
              <p className="text-gray-500">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sections;
