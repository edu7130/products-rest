import express, { Application } from "express";
import cors from 'cors'
import 'colors'
import db from "../db/connection";
import '../models/associations'
import userRouter from "../routes/user";
import productRouter from "../routes/product";
import categoryRouter from "../routes/category";
import uploadsRouter from "../routes/uploads";
import fileUpload from "express-fileupload";


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        categories: '/api/categories',
        users: '/api/users',
        products: '/api/products',
        uploads: '/api/uploads',
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.sync({ force: false, logging: false });
            console.log('Database Online');
        } catch (err: any) {
            console.log('No hay conexion con la base de datos'.underline.red);
            throw new Error(err);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'))


        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRouter)
        this.app.use(this.apiPaths.products, productRouter)
        this.app.use(this.apiPaths.categories, categoryRouter)
        this.app.use(this.apiPaths.uploads, uploadsRouter)
    }

    listen() {
        console.clear()
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port.cyan)
            console.log(`http://localhost:${this.port}`.underline.green)
        })
    }
}

export default Server
