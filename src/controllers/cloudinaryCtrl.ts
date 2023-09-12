import { Request, Response } from 'express';
import { v2 } from 'cloudinary';

class CloudinaryController {

    public async deleteFiles(req: Request, res: Response) {
        try {

            const { folder, publicId } = req.params;

            const safePublicId = folder + "/" + publicId;

            const safePublicIdsArray = [safePublicId];

            const result = await v2.api.delete_resources(safePublicIdsArray);

            return res.status(200).json({ result, ok: true });

        } catch (err) {

            res.status(500).json({
                err,
                message: 'Server error',
                ok: false
            });
        }
    }
}

const cloudinaryController = new CloudinaryController();
export default cloudinaryController;
