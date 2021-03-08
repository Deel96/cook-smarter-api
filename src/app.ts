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
            res.json({ message: "Hallo Pupsi! "});

        });
        this.express.use('/', router);
    }
}