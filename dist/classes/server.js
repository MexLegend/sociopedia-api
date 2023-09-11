"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importStar(require("multer"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const path_1 = require("path");
// Routes
const authRts_1 = __importDefault(require("../routes/authRts"));
const userRts_1 = __importDefault(require("../routes/userRts"));
const postRts_1 = __importDefault(require("../routes/postRts"));
// Middlewares
const auth_1 = require("../middlewares/auth");
// Controllers
const authCtrl_1 = __importDefault(require("../controllers/authCtrl"));
const postCtrl_1 = __importDefault(require("../controllers/postCtrl"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
        this.upload = this.fileStorage();
        this.config();
        this.routes();
        this.routesWithFiles();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    config() {
        dotenv_1.default.config();
        this.app.use((0, cors_1.default)({ origin: true, credentials: true }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, helmet_1.default)());
        this.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
        this.app.use((0, morgan_1.default)("common"));
        this.app.use(body_parser_1.default.json({ limit: "30mb" }));
        this.app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
        this.app.use('/assets', express_1.default.static((0, path_1.join)(__dirname, '../public/assets')));
    }
    fileStorage() {
        const storage = (0, multer_1.diskStorage)({
            destination: function (req, file, cb) {
                cb(null, "./src/public/assets");
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname.toLowerCase().split(' ').join('-');
                cb(null, fileName);
            },
        });
        return (0, multer_1.default)({
            storage, fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                }
                else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            }
        });
    }
    routes() {
        this.app.use('/api/auth', authRts_1.default);
        this.app.use('/api/users', userRts_1.default);
        this.app.use('/api/posts', postRts_1.default);
    }
    routesWithFiles() {
        this.app.post('/api/auth/register', this.upload.single("imgFile"), authCtrl_1.default.register);
        this.app.post('/api/posts', [auth_1.AUTH.verifyToken], this.upload.single("imgFile"), postCtrl_1.default.createPost);
    }
    start() {
        const port = process.env.PORT || 3001;
        this.httpServer.listen(port, () => {
            console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');
            console.log('\x1b[36m\x1b[1m', 'Server Port:', '\x1b[32m', `${port}`, '\x1b[0m');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map