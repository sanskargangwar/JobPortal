import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";

export default function ResumePage() {
  const { userId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/resume/public/${userId}`
        );
        setResume(res.data.resume);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [userId]);

  if (loading) return <Spinner />;
  if (!resume) return <p className="text-white">No resume found.</p>;

  return (
    <>
      <iframe
        src={resume}
        title="Resume"
        width="100%"
        height="900px"
        className="border rounded"
      />
      <a
        href={resume}
        download="resume.pdf"
        className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Resume
      </a>
    </>
  );
}
