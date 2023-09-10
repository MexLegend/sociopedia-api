import { Router } from 'express';

import { AUTH } from '../middlewares/auth';
import postController from '../controllers/postCtrl';

class PostRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // READ
        this.router.get('/', [AUTH.verifyToken], postController.getFeedPosts);
        this.router.get('/:userId/posts', [AUTH.verifyToken], postController.getUserPosts);

        // UPDATE
         this.router.patch('/:id/like', [AUTH.verifyToken], postController.likePost);

    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;
