import * as express from 'express';
import {User} from "./models/user";

export class App {

    public express;
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    private mountRoutes(): void {
        const router = express.Router();
        router.get('/', async (req, res) => {
            res.json({ message: await User.findOne(1)});

        });
        this.express.use('/', router);
    }
}