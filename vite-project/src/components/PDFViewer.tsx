import React, { useEffect, useRef, useState } from "react";

interface PDFViewerProps {
  pdfUrl: string; // Local or imported PDF file path
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderIdRef = useRef(0);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign("/");
    }
  };

  useEffect(() => {
    const currentRenderId = ++renderIdRef.current;

    const loadPDFJS = async () => {
      if (typeof window.pdfjsLib === "undefined") {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load PDF.js"));
          document.head.appendChild(script);
        });
      }

      const pdfLib = window.pdfjsLib;
      pdfLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      renderPDF(pdfLib, currentRenderId);
    };

    const renderPDF = async (pdfLib: any, renderId: number) => {
      if (!containerRef.current) return;

      try {
        setLoading(true);
        setError(null);
        containerRef.current.innerHTML = "";

        // ✅ Handles local/imported PDFs as well
        const loadingTask = pdfLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const isMobile = window.innerWidth < 768;
        const baseScale = isMobile ? 0.9 : 1.5;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          if (renderId !== renderIdRef.current) return;

          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: baseScale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const wrapper = document.createElement("div");
          wrapper.className = "pdf-page";
          wrapper.style.position = "relative";
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "center";
          wrapper.style.marginBottom = "20px";

          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.maxWidth = "920px";
          canvas.style.borderRadius = "6px";
          canvas.style.boxShadow = "0 1px 4px rgba(0,0,0,0.15)";
          canvas.style.backgroundColor = "#fff";

          // 🔒 Transparent overlay to prevent right-click/download
          const overlay = document.createElement("div");
          overlay.style.position = "absolute";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.background = "rgba(255,255,255,0)";
          overlay.oncontextmenu = (e) => e.preventDefault();

          wrapper.appendChild(canvas);
          wrapper.appendChild(overlay);
          containerRef.current.appendChild(wrapper);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load Resume. Please try again later.");
        setLoading(false);
      }
    };

    loadPDFJS();
  }, [pdfUrl]);

  return (
    <div
      className="pdf-viewer"
      onContextMenu={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="w-full flex items-center mb-4"
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "transparent",
          padding: "10px 0",
          zIndex: 20,
        }}
      >
        <button
          onClick={handleGoBack}
          className="text-xs px-3 py-1 bg-white border border-gray-300 rounded shadow-md text-blue-900 font-medium cursor-pointer hover:bg-gray-50"
          aria-label="Go back"
        >
          ← Go Back
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          maxWidth: "920px",
          width: "100%",
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default PDFViewer;
