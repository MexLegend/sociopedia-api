import { Request, Response } from 'express';
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from '../models/userMdl';

class AuthController {

    // REGISTERING
    public async register(req: Request, res: Response) {
        try {

            const {
                firstName,
                lastName,
                friends,
                email,
                password,
                imgPath,
                location,
                occupation,
                viewedProfile,
                impressions,
            } = req.body;

            const newUser = new User({
                firstName,
                lastName,
                friends,
                email,
                password: hashSync(password, 10),
                imgPath,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000)
            });

            const savedUser = await newUser.save();

            res.status(201).json({ ok: true, savedUser });

        } catch (err: any) {

            console.log(err);
            

            res.status(500).json({ error: err.message, ok: false });
        }
    }

    // LOGGING IN
    public async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) return res.status(400).json({ msg: "User does not exists.", ok: false });

            if (!compareSync(password, user.password!)) return res.status(400).json({ msg: 'Invalid credentials', ok: false });

            const token = sign({ id: user._id }, process.env.JWT_SECRET!);

            const { password: userPassword, ...userWitoutPassword } = (user as any)._doc;

            res.status(201).json({ ok: true, token, user: userWitoutPassword });

        } catch (err: any) {

            res.status(500).json({ error: err.message, ok: false });
        }
    }
}

const authController = new AuthController();
export default authController;
