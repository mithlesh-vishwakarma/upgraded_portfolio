import { Router } from "express";
import { login, resetPassword } from "../controllers/authController";

const router = Router();

router.post("/login", login as any);
router.post("/reset-password", resetPassword as any);

export default router;
