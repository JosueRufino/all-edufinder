"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forum_controller_1 = require("../controllers/forum.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rotas públicas do fórum
router.get('/topics', forum_controller_1.ForumController.listTopics);
router.get('/topics/:id', forum_controller_1.ForumController.getTopicById);
// Rotas protegidas (JWT obrigatório)
router.post('/topics', auth_1.authMiddleware, forum_controller_1.ForumController.createTopic);
router.post('/topics/:id/replies', auth_1.authMiddleware, forum_controller_1.ForumController.replyTopic);
exports.default = router;
//# sourceMappingURL=forum.routes.js.map