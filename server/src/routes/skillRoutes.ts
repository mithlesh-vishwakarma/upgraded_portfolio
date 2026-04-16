import { Router } from "express";
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  createExtraSkill,
  deleteExtraSkill,
  createCategory,
  updateCategory,
  deleteCategory
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

// Categories
router.post("/categories", protect as any, createCategory as any);
router.put("/categories/:id", protect as any, updateCategory as any);
router.delete("/categories/:id", protect as any, deleteCategory as any);

export default router;
