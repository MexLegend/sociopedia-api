"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const postCtrl_1 = __importDefault(require("../controllers/postCtrl"));
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // READ
        this.router.get('/', [auth_1.AUTH.verifyToken], postCtrl_1.default.getFeedPosts);
        this.router.get('/:userId/posts', [auth_1.AUTH.verifyToken], postCtrl_1.default.getUserPosts);
        // UPDATE
        this.router.patch('/:id/like', [auth_1.AUTH.verifyToken], postCtrl_1.default.likePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
//# sourceMappingURL=postRts.js.map