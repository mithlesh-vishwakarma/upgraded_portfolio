import { Router } from "express";
import { 
  getExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from "../controllers/experienceController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getExperience as any);

router.post("/", protect as any, createExperience as any);
router.put("/:id", protect as any, updateExperience as any);
router.delete("/:id", protect as any, deleteExperience as any);

export default router;
