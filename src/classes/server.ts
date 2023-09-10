import express, { Application } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer, { Multer, diskStorage } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import http from 'http';
import { join } from 'path';

// Routes
import authRoutes from '../routes/authRts';
import userRoutes from '../routes/userRts';
import postRoutes from '../routes/postRts';

// Middlewares
import { AUTH } from '../middlewares/auth';

// Controllers
import authController from '../controllers/authCtrl';
import postController from '../controllers/postCtrl';

export default class Server {
    private static _instance: Server;
    public app: Application;

    private httpServer: http.Server;

    private upload: Multer;

    private constructor() {
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.upload = this.fileStorage();

        this.config();
        this.routes();
        this.routesWithFiles();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    config(): void {
        dotenv.config();
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
        this.app.use(morgan("common"));
        this.app.use(bodyParser.json({ limit: "30mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
        this.app.use('/assets', express.static(join(__dirname, '../public/assets')));
    }

    fileStorage(): Multer {
        const storage = diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./src/public/assets");
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname.toLowerCase().split(' ').join('-');
                cb(null, fileName);
            },
        });
        return multer({
            storage, fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            }
        });
    }

    routes(): void {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/posts', postRoutes);
    }

    routesWithFiles(): void {
        this.app.post('/api/auth/register', this.upload.single("imgFile"), authController.register);
        this.app.post('/api/posts', [AUTH.verifyToken], this.upload.single("imgFile"), postController.createPost);
    }

    start(): void {
        const port = process.env.PORT || 3001;
        this.httpServer.listen(port, () => {
            console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');
            console.log('\x1b[36m\x1b[1m', 'Server Port:', '\x1b[32m', `${port}`, '\x1b[0m');
        });
    }
}
