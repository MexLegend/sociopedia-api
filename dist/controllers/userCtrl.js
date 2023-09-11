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
class UserController {
    // READ
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userMdl_1.default.findById(id);
                res.status(200).json({ user, ok: true });
            }
            catch (err) {
                res.status(404).json({ message: err.message, ok: false });
            }
        });
    }
    getUserFriends(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userMdl_1.default.findById(id);
                const userFriends = yield userMdl_1.default.find({ _id: { $in: user.friends.map((id) => id) } });
                const formatedFriends = userFriends.map(({ _id, firstName, lastName, occupation, location, imgPath }) => ({ _id, firstName, lastName, occupation, location, imgPath }));
                res.status(200).json({ formatedFriends, ok: true });
            }
            catch (err) {
                res.status(404).json({ message: err.message, ok: false });
            }
        });
    }
    // UPDATE
    addRemoveFriend(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, friendId } = req.params;
                const user = yield userMdl_1.default.findById(id);
                const friend = yield userMdl_1.default.findById(friendId);
                if (user.friends.includes(friendId)) {
                    user.friends = (_a = user.friends) === null || _a === void 0 ? void 0 : _a.filter(id => id !== friendId);
                    friend.friends = (_b = friend.friends) === null || _b === void 0 ? void 0 : _b.filter(id => id !== id);
                }
                else {
                    user.friends.push(friendId);
                    friend.friends.push(id);
                }
                yield (user === null || user === void 0 ? void 0 : user.save());
                yield (friend === null || friend === void 0 ? void 0 : friend.save());
                const userFriends = yield userMdl_1.default.find({ _id: { $in: user.friends.map((id) => id) } });
                const formatedFriends = userFriends.map(({ _id, firstName, lastName, occupation, location, imgPath }) => ({ _id, firstName, lastName, occupation, location, imgPath }));
                res.status(200).json({ formatedFriends, ok: true });
            }
            catch (err) {
                res.status(404).json({ message: err.message, ok: false });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userCtrl.js.map