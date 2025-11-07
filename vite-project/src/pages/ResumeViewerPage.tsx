import { useLocation } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";
import localPDF from "../assets/resume-07-Nov-Mithlesh-Vishwakarma.pdf";

type LocationState = {
  url?: string;
} | null;

const ResumeViewerPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const url = state?.url || localPDF; // fallback to manual PDF if no URL passed

  return (
    <div className="p-0">
      <PDFViewer pdfUrl={url} />
    </div>
  );
};

export default ResumeViewerPage;
