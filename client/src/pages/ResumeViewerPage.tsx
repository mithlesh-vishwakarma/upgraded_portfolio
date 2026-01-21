import { useLocation } from "react-router";
import PDFViewer from "../components/PDFViewer";
import localPDF from "../assets/resume-07-Nov-Mithlesh-Vishwakarma.pdf";
// import Magnet from '../components/Magnet';

type LocationState = {
  url?: string;
} | null;

const ResumeViewerPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const url = state?.url || localPDF; // fallback to manual PDF if no URL passed

  // const handleGoBack = () => {
  //   if (window.history.length > 1) {
  //     window.history.back();
  //   } else {
  //     window.location.assign("/");
  //   }
  // };

  // const handleDownload = () => {
  //   const now = new Date();

    // Format: YYYY-MM-DD_HH-MM-SS
    // const formattedDateTime = now
    //   .toLocaleString("en-GB", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //     hour12: false,
    //   })
    //   .replace(/[\/, ]/g, "-")
    //   .replace(/--/g, "-");

  //   const fileName = `mithlesh-vishwakarma-resume-${formattedDateTime}.pdf`;

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName;
  //   link.click();
  // };

  return (
    <div className="relative">
      {/* Fixed buttons below header */}
      {/* <div className="fixed top-[9rem] left-[23rem] z-50 flex gap-[3.5rem]">
        <Magnet padding={100} disabled={false} magnetStrength={20}>
        <button
          onClick={handleGoBack}
          className="text-xs px-3 py-1 bg-yellow-500 border border-gray-900 rounded shadow-md text-gray-900 font-medium cursor-pointer hover:bg-gray-50"
          aria-label="Go back"
        >
          ← Go Back
        </button>
        </Magnet>
        <Magnet padding={100} disabled={false} magnetStrength={20}>
        <button
          onClick={handleDownload}
          className="text-xs px-3 py-1 bg-yellow-500 border border-gray-900 rounded shadow-md text-gray-900 font-medium cursor-pointer hover:bg-gray-50"
          aria-label="Download resume"
        >
          Download Resume
        </button>
        </Magnet>
      </div> */}

      {/* PDF Viewer */}
      <div className="mt-[10rem] overflow-hidden">
        <PDFViewer pdfUrl={url} />
      </div>
    </div>
  );
};

export default ResumeViewerPage;
