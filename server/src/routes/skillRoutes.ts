import { Router } from "express";
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  createExtraSkill,
  deleteExtraSkill
} from "../controllers/skillController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getSkills as any);

router.post("/", protect as any, createSkill as any);
router.put("/:id", protect as any, updateSkill as any);
router.delete("/:id", protect as any, deleteSkill as any);

// Extra skills
router.post("/extra", protect as any, createExtraSkill as any);
router.delete("/extra/:id", protect as any, deleteExtraSkill as any);

export default router;
