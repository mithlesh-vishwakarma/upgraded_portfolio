import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FileText, ArrowLeft } from "lucide-react";
import Magnet from "../components/Magnet";

const ResumeViewerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasResume, setHasResume] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/resume")
      .then((res) => {
        if (res.data?.resumeUrl) {
          setHasResume(true);
          // Directly open/redirect to the uploaded PDF document
          window.location.replace(res.data.resumeUrl);
        } else {
          setHasResume(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching dynamic resume:", err);
        setHasResume(false);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white font-roboto flex items-center justify-center p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-gray-400 font-medium tracking-wide">Opening Resume Document...</p>
        </div>
      ) : !hasResume ? (
        <div className="max-w-[550px] w-full p-10 bg-gray-900/80 border border-gray-800 rounded-3xl text-center shadow-2xl backdrop-blur-xl">
          <FileText className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Resume Updating Shortly</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            My resume will be updated and uploaded shortly. Please check back soon!
          </p>
          <Magnet padding={40} disabled={false} magnetStrength={15}>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Magnet>
        </div>
      ) : null}
    </div>
  );
};

export default ResumeViewerPage;
