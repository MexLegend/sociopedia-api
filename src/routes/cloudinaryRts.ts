import { Router } from 'express';
import cloudinaryController from '../controllers/cloudinaryCtrl';

class CloudinaryRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.delete('/:folder/:publicId', cloudinaryController.deleteFiles);
    }
}

const cloudinaryRoutes = new CloudinaryRoutes();
export default cloudinaryRoutes.router;
