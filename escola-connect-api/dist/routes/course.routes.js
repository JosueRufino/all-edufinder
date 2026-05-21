"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
// Rotas públicas de cursos
router.get('/', course_controller_1.CourseController.list);
router.get('/:id', course_controller_1.CourseController.getById);
exports.default = router;
//# sourceMappingURL=course.routes.js.map