import { Router } from 'express';

import { AUTH } from '../middlewares/auth';
import userController from '../controllers/userCtrl';

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // READ
        this.router.get('/:id', [AUTH.verifyToken], userController.getUser);
        this.router.get('/:id/friends', [AUTH.verifyToken], userController.getUserFriends);

        // UPDATE
        this.router.patch('/:id/:friendId', [AUTH.verifyToken], userController.addRemoveFriend);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
