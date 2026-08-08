import { Router } from "express";
import { getResume, uploadResume, deleteResume } from "../controllers/resumeController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getResume as any);
router.post("/upload", protect as any, uploadResume as any);
router.delete("/", protect as any, deleteResume as any);

export default router;
