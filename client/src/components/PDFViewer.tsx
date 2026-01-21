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
  const [error, setError] = useState<string | null>(null);
  const pdfInstanceRef = useRef<any>(null);
  const renderIdRef = useRef(0);



  // --- Render PDF pages silently ---
  const renderPDF = async (pdf: any, renderId: number) => {
    if (!containerRef.current) return;

    try {
      setError(null);

      // Create a temporary container to render pages invisibly first
      const tempContainer = document.createElement("div");

      const isMobile = window.innerWidth < 768;
      const baseScale = (isMobile ? 0.9 : 1.5) * window.devicePixelRatio;

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
        tempContainer.appendChild(wrapper);
      }

      // Smooth swap
      if (renderId === renderIdRef.current && containerRef.current) {
        containerRef.current.style.opacity = "0.5";
        requestAnimationFrame(() => {
          containerRef.current!.innerHTML = "";
          containerRef.current!.append(...Array.from(tempContainer.children));
          containerRef.current!.style.opacity = "1";
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to render PDF. Please try again later.");
    }
  };

  // --- Load PDF.js & Cache the instance ---
  const loadPDFJS = async () => {
    const currentRenderId = ++renderIdRef.current;

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

    if (!pdfInstanceRef.current) {
      const loadingTask = pdfLib.getDocument(pdfUrl);
      pdfInstanceRef.current = await loadingTask.promise;
    }

    renderPDF(pdfInstanceRef.current, currentRenderId);
  };

  // --- Initial Load ---
  useEffect(() => {
    loadPDFJS();
  }, [pdfUrl]);

  // --- Detect Zoom & Silent Re-render ---
  useEffect(() => {
    let lastZoom = window.devicePixelRatio;

    const handleZoomChange = () => {
      const newZoom = window.devicePixelRatio;
      if (Math.abs(newZoom - lastZoom) > 0.05) {
        lastZoom = newZoom;
        renderIdRef.current++;
        const pdfLib = window.pdfjsLib;
        if (pdfLib && pdfInstanceRef.current) {
          renderPDF(pdfInstanceRef.current, renderIdRef.current);
        }
      }
    };

    let timeout: ReturnType<typeof setTimeout>;
    const debouncedZoom = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleZoomChange, 400);
    };

    window.addEventListener("resize", debouncedZoom);
    return () => {
      window.removeEventListener("resize", debouncedZoom);
      clearTimeout(timeout);
    };
  }, []);

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
        transition: "opacity 0.2s ease",
      }}
    >


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
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};

export default PDFViewer;
