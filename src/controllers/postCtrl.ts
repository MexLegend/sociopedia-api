import { Request, Response } from 'express';
import User from "../models/userMdl";
import Post from "../models/postMdl";


class PostController {

    // CREATE
    public async createPost(req: Request, res: Response) {
        try {

            const { userId, description, imgPath } = req.body;

            const user = await User.findById(userId);

            const newPost = new Post({
                userId,
                firstName: user?.firstName,
                lastName: user?.lastName,
                location: user?.location,
                description,
                userImgPath: user?.imgPath,
                imgPath,
                likes: {},
                comments: []
            });

            await newPost.save();

            const posts = await Post.find();

            res.status(201).json({ posts, ok: true });

        } catch (err: any) {
            res.status(409).json({ error: err.message, ok: false });
        }
    }

    // READ
    public async getFeedPosts(req: Request, res: Response) {
        try {

            const posts = await Post.find();

            res.status(200).json({ posts, ok: true });

        } catch (err: any) {
            res.status(404).json({ error: err.message, ok: false });
        }
    }

    public async getUserPosts(req: Request, res: Response) {
        try {

            const { userId } = req.params;

            const posts = await Post.find({ userId });

            res.status(200).json({ posts, ok: true });
        } catch (err: any) {
            res.status(404).json({ error: err.message, ok: false });
        }
    }

    // UPDATE
    public async likePost(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const { userId } = req.body;

            const post = await Post.findById(id);
            const isLiked = post?.likes?.get(userId);

            if (isLiked) {
                post!.likes?.delete(userId);
            } else {
                post!.likes?.set(userId, true);
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { likes: post!.likes },
                { new: true }
            );

            res.status(200).json({ ok: true, updatedPost });
        } catch (err: any) {
            res.status(404).json({ error: err.message, ok: false });
        }
    }
}

const postController = new PostController();
export default postController;
