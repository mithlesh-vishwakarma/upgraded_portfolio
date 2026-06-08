"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../controllers/projects.controller");
const router = (0, express_1.Router)();
router.get("/", projects_controller_1.getProjects);
router.post("/", projects_controller_1.createProject);
exports.default = router;
