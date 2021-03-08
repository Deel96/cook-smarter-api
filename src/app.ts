import * as express from 'express';

export class App {

    public express;
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    private mountRoutes(): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({ message: "Hello Heroku!"});

        });
        this.express.use('/', router);
    }
}