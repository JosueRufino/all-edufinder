"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Endpoint for single image upload
router.post('/', upload_1.upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Nenhuma imagem foi enviada.' });
        }
        // Construct the public URL for the uploaded file
        const protocol = req.protocol;
        const host = req.get('host');
        const filename = req.file.filename;
        // Defaulting to HTTP for local dev if protocol is somehow missing or proxied wrong, 
        // but protocol should work.
        const fileUrl = `${protocol}://${host}/uploads/${filename}`;
        return res.status(200).json({
            success: true,
            message: 'Upload concluído com sucesso.',
            url: fileUrl
        });
    }
    catch (error) {
        console.error('Erro no upload:', error);
        return res.status(500).json({ success: false, message: 'Erro interno durante o upload.' });
    }
});
exports.default = router;
//# sourceMappingURL=upload.routes.js.map