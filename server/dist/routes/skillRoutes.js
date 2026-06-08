"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillController_1 = require("../controllers/skillController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", skillController_1.getSkills);
router.post("/", authMiddleware_1.protect, skillController_1.createSkill);
router.put("/:id", authMiddleware_1.protect, skillController_1.updateSkill);
router.delete("/:id", authMiddleware_1.protect, skillController_1.deleteSkill);
// Extra skills
router.post("/extra", authMiddleware_1.protect, skillController_1.createExtraSkill);
router.delete("/extra/:id", authMiddleware_1.protect, skillController_1.deleteExtraSkill);
// Categories
router.post("/categories", authMiddleware_1.protect, skillController_1.createCategory);
router.put("/categories/:id", authMiddleware_1.protect, skillController_1.updateCategory);
router.delete("/categories/:id", authMiddleware_1.protect, skillController_1.deleteCategory);
exports.default = router;
