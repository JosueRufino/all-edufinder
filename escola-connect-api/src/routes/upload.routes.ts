import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';

const router = Router();

// Endpoint for single image upload
router.post('/', upload.single('image'), (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error('Erro no upload:', error);
    return res.status(500).json({ success: false, message: 'Erro interno durante o upload.' });
  }
});

export default router;
