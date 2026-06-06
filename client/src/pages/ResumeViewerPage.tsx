import { useLocation } from "react-router";
import PDFViewer from "../components/PDFViewer";
import localPDF from "../assets/mithlesh-vishwakarma.pdf";
import Magnet from '../components/Magnet';

type LocationState = {
  url?: string;
} | null;

const ResumeViewerPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const url = state?.url || localPDF; // fallback to manual PDF if no URL passed

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      {/* Left-aligned back button bar below header */}
      <div className="max-w-[1000px] w-full mx-auto px-6 pt-[7rem] lg:pt-[8rem] flex justify-start">
        <Magnet padding={50} disabled={false} magnetStrength={15}>
          <button
            onClick={handleGoBack}
            className="text-sm px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 border border-gray-900 rounded-full shadow-[0_4px_14px_rgba(234,179,8,0.3)] text-gray-900 font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2"
            aria-label="Go back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Go Back
          </button>
        </Magnet>
      </div>

      {/* PDF Viewer */}
      <div className="mt-4 overflow-hidden">
        <PDFViewer pdfUrl={url} />
      </div>
    </div>
  );
};

export default ResumeViewerPage;
