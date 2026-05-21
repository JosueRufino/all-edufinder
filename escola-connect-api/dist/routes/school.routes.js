"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const school_controller_1 = require("../controllers/school.controller");
const router = (0, express_1.Router)();
// Rotas públicas
router.get('/', school_controller_1.SchoolController.list);
router.get('/:id', school_controller_1.SchoolController.getById);
// Rotas de gestão (sem autenticação)
router.post('/', school_controller_1.SchoolController.create);
router.patch('/:id', school_controller_1.SchoolController.update);
router.delete('/:id', school_controller_1.SchoolController.delete);
exports.default = router;
//# sourceMappingURL=school.routes.js.map