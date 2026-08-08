import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { supabase } from "../services/supabase";

const getResumeInfoPath = () => path.join(process.cwd(), "uploads", "resume_info.json");

export const getResume = async (req: Request, res: Response) => {
  try {
    // 1. Attempt to fetch active resume from Supabase table
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return res.json({
          resumeUrl: data.resume_url,
          filename: data.filename,
          fileSize: Number(data.file_size || 0),
          updatedAt: data.updated_at,
        });
      }
    } catch (supabaseErr: any) {
      console.warn("Supabase resumes fetch warning:", supabaseErr?.message);
    }

    // 2. Fallback to local JSON file if Supabase fails or record doesn't exist
    const infoPath = getResumeInfoPath();
    if (fs.existsSync(infoPath)) {
      const data = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
      return res.json(data);
    }

    return res.json({
      resumeUrl: null,
      filename: "",
      fileSize: 0,
      updatedAt: null,
      message: "No custom resume uploaded yet."
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching resume info", error: error.message });
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  const { file, name } = req.body;

  if (!file || typeof file !== "string") {
    return res.status(400).json({ message: "PDF file string is required." });
  }

  try {
    let base64Data = file;
    const matches = file.match(/^data:application\/(pdf);base64,([\s\S]+)$/i);
    if (matches && matches.length === 3) {
      base64Data = matches[2].replace(/\s+/g, "");
    } else if (file.startsWith("data:")) {
      const parts = file.split(";base64,");
      if (parts.length === 2) {
        base64Data = parts[1].replace(/\s+/g, "");
      }
    } else {
      base64Data = file.replace(/\s+/g, "");
    }

    const fileBuffer = Buffer.from(base64Data, "base64");
    if (fileBuffer.length === 0) {
      return res.status(400).json({ message: "Invalid PDF file content." });
    }

    const originalName = name || "resume.pdf";
    const cleanName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFilename = `resume-${Date.now()}-${cleanName}`;

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFilePath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(localFilePath, fileBuffer);

    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.headers["x-forwarded-host"] || req.get("host");
    let finalUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

    // Attempt to upload to Supabase storage bucket
    try {
      const { error: uploadErr } = await supabase.storage
        .from("portfolio")
        .upload(`resumes/${uniqueFilename}`, fileBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (!uploadErr) {
        const { data: publicUrlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(`resumes/${uniqueFilename}`);

        if (publicUrlData?.publicUrl) {
          finalUrl = publicUrlData.publicUrl;
        }
      }
    } catch (supabaseError: any) {
      console.warn("Supabase storage resume upload warning:", supabaseError?.message);
    }

    const resumeInfo = {
      resumeUrl: finalUrl,
      filename: originalName,
      fileSize: fileBuffer.length,
      updatedAt: new Date().toISOString(),
    };

    // Save to local JSON file for local fallback
    fs.writeFileSync(getResumeInfoPath(), JSON.stringify(resumeInfo, null, 2));

    // Save to Supabase `resumes` table
    try {
      // Mark previous active resumes as inactive
      await supabase.from("resumes").update({ is_active: false }).eq("is_active", true);

      // Insert new active resume
      await supabase.from("resumes").insert([{
        filename: originalName,
        resume_url: finalUrl,
        file_size: fileBuffer.length,
        is_active: true,
        updated_at: resumeInfo.updatedAt,
      }]);
    } catch (dbErr: any) {
      console.warn("Supabase resumes DB insert warning:", dbErr?.message);
    }

    return res.json({
      message: "Resume uploaded successfully",
      ...resumeInfo,
    });
  } catch (error: any) {
    console.error("Resume upload error:", error);
    res.status(500).json({ message: "Error uploading resume", error: error.message });
  }
};

export const deleteResume = async (req: Request, res: Response) => {
  try {
    // Delete/deactivate in Supabase table
    try {
      await supabase.from("resumes").update({ is_active: false }).eq("is_active", true);
    } catch (dbErr: any) {
      console.warn("Supabase resumes DB reset warning:", dbErr?.message);
    }

    // Unlink local JSON file
    const infoPath = getResumeInfoPath();
    if (fs.existsSync(infoPath)) {
      fs.unlinkSync(infoPath);
    }
    return res.json({ message: "Resume reset to default successfully." });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting resume info", error: error.message });
  }
};
