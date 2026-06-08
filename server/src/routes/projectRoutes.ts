import { Router } from "express";
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject, 
  getRelatedProjects,
  uploadProjectImage,
  reorderProjects
} from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProjects as any);
router.get("/:id", getProjectById as any);
router.get("/:id/related", getRelatedProjects as any);

router.post("/", protect as any, createProject as any);
router.put("/:id", protect as any, updateProject as any);
router.delete("/:id", protect as any, deleteProject as any);
router.post("/upload", protect as any, uploadProjectImage as any);
router.post("/reorder", protect as any, reorderProjects as any);

export default router;
