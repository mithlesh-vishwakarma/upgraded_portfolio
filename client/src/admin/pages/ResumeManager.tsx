import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { useToast } from "../../context/ToastContext";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Download,
  Eye,
  RefreshCw,
  Trash2,
  FileCheck,
  Sparkles
} from "lucide-react";

interface ResumeData {
  resumeUrl: string | null;
  filename: string;
  fileSize?: number;
  updatedAt?: string | null;
}

const ResumeManager: React.FC = () => {
  const { showToast } = useToast();
  const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchResumeInfo = async () => {
    try {
      setLoading(true);
      const response = await api.get("/resume");
      setResumeInfo(response.data);
    } catch (error: any) {
      console.error("Error fetching resume info:", error);
      showToast("Failed to fetch current resume details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      showToast("Please select a valid PDF document (.pdf)", "error");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast("File size exceeds 15MB limit", "error");
      return;
    }
    setSelectedFile(file);
    showToast(`File "${file.name}" selected`, "info");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast("Please select a PDF file to upload", "error");
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const base64String = reader.result as string;
        try {
          const response = await api.post("/resume/upload", {
            file: base64String,
            name: selectedFile.name,
          });

          setResumeInfo(response.data);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          showToast("Resume uploaded and published successfully!", "success");
        } catch (err: any) {
          console.error("Upload error:", err);
          showToast(err.response?.data?.message || "Failed to upload resume", "error");
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        showToast("Error reading file", "error");
        setUploading(false);
      };
    } catch (error: any) {
      console.error("Upload exception:", error);
      showToast("Error uploading file", "error");
      setUploading(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm("Are you sure you want to reset the resume to the default file?")) {
      return;
    }

    try {
      await api.delete("/resume");
      await fetchResumeInfo();
      setSelectedFile(null);
      showToast("Resume reset to default file", "success");
    } catch (error: any) {
      showToast("Failed to reset resume", "error");
    }
  };

  const activePdfUrl = resumeInfo?.resumeUrl || "";

  const formatBytes = (bytes?: number) => {
    if (!bytes || bytes === 0) return "Default file";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-slate-400 animate-pulse uppercase tracking-widest">
        Loading Resume Manager...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-roboto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-yellow-500" />
            Resume Management
          </h2>
          <p className="text-gray-400 font-medium tracking-wide">
            Upload and update your official CV / Resume displayed across your portfolio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm ${
              previewMode
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Eye className="w-4 h-4 text-yellow-500" />
            {previewMode ? "Hide Preview" : "Live Preview"}
          </button>
          <a
            href={activePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-yellow-500/20"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-yellow-500" />
              Upload New Resume (PDF)
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Select or drop your updated resume PDF file below. The new resume will immediately update on your live portfolio.
            </p>

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? "border-yellow-500 bg-yellow-50/50 scale-[1.01]"
                  : selectedFile
                  ? "border-green-500 bg-green-50/30"
                  : "border-gray-200 hover:border-yellow-400 hover:bg-gray-50/60"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform ${
                    selectedFile
                      ? "bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30"
                      : "bg-yellow-500/10 text-yellow-600"
                  }`}
                >
                  {selectedFile ? (
                    <FileCheck className="w-8 h-8" />
                  ) : (
                    <UploadCloud className="w-8 h-8" />
                  )}
                </div>

                {selectedFile ? (
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-full uppercase mb-2">
                      Ready to upload
                    </span>
                    <p className="text-lg font-black text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      Size: {formatBytes(selectedFile.size)}
                    </p>
                    <p className="text-xs text-yellow-600 font-bold mt-2">
                      Click "Publish Resume" button below to apply changes
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-base font-bold text-slate-800">
                      Drag & Drop your PDF resume here, or{" "}
                      <span className="text-yellow-600 underline">Browse</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      Supports: PDF format only (Max: 15MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              {selectedFile ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                  Cancel Selection
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg ${
                  !selectedFile || uploading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-slate-900 text-white hover:bg-yellow-500 hover:text-slate-900 shadow-slate-900/20 cursor-pointer"
                }`}
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Publishing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Publish Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Current Resume Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-xs rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Resume
                </span>
              </div>

              <div>
                <h4 className="text-xl font-black tracking-tight text-white mb-1">
                  {resumeInfo?.filename || "No Resume Uploaded"}
                </h4>
                <p className="text-xs font-semibold text-slate-400">
                  {resumeInfo?.resumeUrl ? "Custom Uploaded Resume" : "No Active Upload"}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>File Size:</span>
                  <span className="text-white font-bold">{formatBytes(resumeInfo?.fileSize)}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Last Updated:</span>
                  <span className="text-white font-bold">
                    {resumeInfo?.updatedAt
                      ? new Date(resumeInfo.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Storage Location:</span>
                  <span className="text-yellow-400 font-bold">
                    {resumeInfo?.resumeUrl ? "Supabase / Server Storage" : "None"}
                  </span>
                </div>
              </div>

              {resumeInfo?.resumeUrl && (
                <button
                  onClick={handleResetToDefault}
                  className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset to Default Resume
                </button>
              )}
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Live PDF Preview Modal / Section */}
      {previewMode && (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-md animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-yellow-500" />
              Live Resume Preview
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Showing: {activePdfUrl}
            </span>
          </div>

          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-inner h-[650px]">
            <iframe
              src={`${activePdfUrl}#view=FitH`}
              className="w-full h-full border-0"
              title="Resume Live Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeManager;
