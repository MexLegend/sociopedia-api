import express, { Application } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import { v2 } from 'cloudinary';
import bodyParser from 'body-parser';
import { join } from 'path';

// Routes
import authRoutes from '../routes/authRts';
import cloudinaryRoutes from '../routes/cloudinaryRts';
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

    private constructor() {
        this.app = express();
        this.httpServer = new http.Server(this.app);

        this.config();
        this.configCloudinary();
        this.routes();
        this.routesWithFiles();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    config(): void {
        dotenv.config();
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json({ limit: '20mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '20mb' }));
        this.app.use(bodyParser.json({ limit: "20mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
        this.app.use(express.static(join(__dirname, '../public')));
    }
    
    configCloudinary(): void {
        v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        });
      }

    routes(): void {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/cloudinary', cloudinaryRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/posts', postRoutes);
        this.app.post('/api/auth/register', authController.register);
        this.app.post('/api/posts', [AUTH.verifyToken], postController.createPost);
    }

    routesWithFiles(): void {
        this.app.post('/api/auth/register', authController.register);
        this.app.post('/api/posts', [AUTH.verifyToken], postController.createPost);
    }

    start(): void {
        const port = process.env.PORT || 3001;
        this.httpServer.listen(port, () => {
            console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');
            console.log('\x1b[36m\x1b[1m', 'Server Port:', '\x1b[32m', `${port}`, '\x1b[0m');
        });
    }
}
