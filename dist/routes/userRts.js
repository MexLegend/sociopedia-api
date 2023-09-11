"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const userCtrl_1 = __importDefault(require("../controllers/userCtrl"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // READ
        this.router.get('/:id', [auth_1.AUTH.verifyToken], userCtrl_1.default.getUser);
        this.router.get('/:id/friends', [auth_1.AUTH.verifyToken], userCtrl_1.default.getUserFriends);
        // UPDATE
        this.router.patch('/:id/:friendId', [auth_1.AUTH.verifyToken], userCtrl_1.default.addRemoveFriend);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRts.js.map