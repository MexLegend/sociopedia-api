import { Request, Response } from 'express';
import User from '../models/userMdl';

class UserController {

    // READ
    public async getUser(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const user = await User.findById(id);

            res.status(200).json({ user, ok: true });

        } catch (err: any) {
            res.status(404).json({ message: err.message, ok: false });
        }
    }

    public async getUserFriends(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const user = await User.findById(id);

            const userFriends = await User.find({ _id: { $in: user!.friends.map((id: any) => id) } });

            const formatedFriends = userFriends.map(({ _id, firstName, lastName, occupation, location, imgPath }) =>
                ({ _id, firstName, lastName, occupation, location, imgPath }));

            res.status(200).json({ formatedFriends, ok: true });

        } catch (err: any) {
            res.status(404).json({ message: err.message, ok: false });
        }
    }

    // UPDATE
    public async addRemoveFriend(req: Request, res: Response) {
        try {

            const { id, friendId } = req.params;

            const user = await User.findById(id);

            const friend = await User.findById(friendId);

            if (user!.friends.includes(friendId)) {
                user!.friends = user!.friends?.filter(id => id !== friendId);
                friend!.friends = friend!.friends?.filter(id => id !== id);
            } else {
                user!.friends.push(friendId);
                friend!.friends.push(id);
            }

            await user?.save();
            await friend?.save();

            const userFriends = await User.find({ _id: { $in: user!.friends.map((id: any) => id) } });

            const formatedFriends = userFriends.map(({ _id, firstName, lastName, occupation, location, imgPath }) =>
                ({ _id, firstName, lastName, occupation, location, imgPath }));

            res.status(200).json({ formatedFriends, ok: true });

        } catch (err: any) {
            res.status(404).json({ message: err.message, ok: false });
        }
    }
}

const userController = new UserController();
export default userController;
