import React from "react";

interface PDFViewerProps {
  pdfUrl: string; // Local or imported PDF file path
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div
      className="pdf-viewer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        minHeight: "100vh",
        transition: "opacity 0.2s ease",
        width: "100%",
      }}
    >
      {/* Responsive PDF IFrame Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "calc(100vh - 220px)",
          minHeight: "650px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          overflow: "hidden",
          backgroundColor: "#1f2937",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="Resume PDF"
        >
          <p>
            Your browser does not support PDFs.{" "}
            <a href={pdfUrl} style={{ color: "#eab308", textDecoration: "underline" }}>
              Download the PDF
            </a>{" "}
            to view it.
          </p>
        </iframe>
      </div>
    </div>
  );
};

export default PDFViewer;
