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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const userMdl_1 = __importDefault(require("../models/userMdl"));
class AuthController {
    // REGISTERING
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, friends, email, password, imgPath, location, occupation, viewedProfile, impressions, } = req.body;
                const newUser = new userMdl_1.default({
                    firstName,
                    lastName,
                    friends,
                    email,
                    password: (0, bcrypt_1.hashSync)(password, 10),
                    imgPath,
                    location,
                    occupation,
                    viewedProfile: Math.floor(Math.random() * 10000),
                    impressions: Math.floor(Math.random() * 10000)
                });
                const savedUser = yield newUser.save();
                res.status(201).json({ ok: true, savedUser });
            }
            catch (err) {
                res.status(500).json({ error: err.message, ok: false });
            }
        });
    }
    // LOGGING IN
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userMdl_1.default.findOne({ email });
                if (!user)
                    return res.status(400).json({ msg: "User does not exists.", ok: false });
                if (!(0, bcrypt_1.compareSync)(password, user.password))
                    return res.status(400).json({ msg: 'Invalid credentials', ok: false });
                const token = (0, jsonwebtoken_1.sign)({ id: user._id }, process.env.JWT_SECRET);
                const _a = user._doc, { password: userPassword } = _a, userWitoutPassword = __rest(_a, ["password"]);
                res.status(201).json({ ok: true, token, user: userWitoutPassword });
            }
            catch (err) {
                res.status(500).json({ error: err.message, ok: false });
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authCtrl.js.map