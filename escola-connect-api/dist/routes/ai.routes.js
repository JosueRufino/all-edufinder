"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const router = (0, express_1.Router)();
// Endpoint de recomendações inteligentes com IA
router.post('/recommend-schools', ai_controller_1.AIController.recommendSchools);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map