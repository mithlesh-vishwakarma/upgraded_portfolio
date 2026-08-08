import { Router } from "express";
import { 
  getEducation, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} from "../controllers/educationController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getEducation as any);

router.post("/", protect as any, createEducation as any);
router.put("/:id", protect as any, updateEducation as any);
router.delete("/:id", protect as any, deleteEducation as any);

export default router;
