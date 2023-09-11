"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userMdl_1 = __importDefault(require("../models/userMdl"));
const postMdl_1 = __importDefault(require("../models/postMdl"));
class PostController {
    // CREATE
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, description, imgPath } = req.body;
                const user = yield userMdl_1.default.findById(userId);
                const newPost = new postMdl_1.default({
                    userId,
                    firstName: user === null || user === void 0 ? void 0 : user.firstName,
                    lastName: user === null || user === void 0 ? void 0 : user.lastName,
                    location: user === null || user === void 0 ? void 0 : user.location,
                    description,
                    userImgPath: user === null || user === void 0 ? void 0 : user.imgPath,
                    imgPath,
                    likes: {},
                    comments: []
                });
                yield newPost.save();
                const posts = yield postMdl_1.default.find();
                res.status(201).json({ posts, ok: true });
            }
            catch (err) {
                res.status(409).json({ error: err.message, ok: false });
            }
        });
    }
    // READ
    getFeedPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postMdl_1.default.find();
                res.status(200).json({ posts, ok: true });
            }
            catch (err) {
                res.status(404).json({ error: err.message, ok: false });
            }
        });
    }
    getUserPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const posts = yield postMdl_1.default.find({ userId });
                res.status(200).json({ posts, ok: true });
            }
            catch (err) {
                res.status(404).json({ error: err.message, ok: false });
            }
        });
    }
    // UPDATE
    likePost(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.body;
                const post = yield postMdl_1.default.findById(id);
                const isLiked = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.get(userId);
                if (isLiked) {
                    (_b = post.likes) === null || _b === void 0 ? void 0 : _b.delete(userId);
                }
                else {
                    (_c = post.likes) === null || _c === void 0 ? void 0 : _c.set(userId, true);
                }
                const updatedPost = yield postMdl_1.default.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
                res.status(200).json({ ok: true, updatedPost });
            }
            catch (err) {
                res.status(404).json({ error: err.message, ok: false });
            }
        });
    }
}
const postController = new PostController();
exports.default = postController;
//# sourceMappingURL=postCtrl.js.map