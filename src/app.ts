import express from 'express';
import passport from "passport"
import session from "express-session";
import bodyParser from "body-parser"
import flash from "connect-flash"
import { errorMiddleware } from './middlewares/error.middleware';
import Route from "./interfaces/route.interface";

import cors from "cors";

export class App {
    public express;

    constructor(routes:Route[]) {
        this.express = express();
        this.express.use(cors({credentials: true, origin: function (origin, callback) {
              callback(null, true);
          }}));

        this.initPassport();
        this.mountRoutes(routes);

        this.express.use(errorMiddleware);
    }

    private initPassport():void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(session({ cookie: { maxAge: null },
            secret: 'woot',
            resave: false,
            saveUninitialized: false}));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use(flash());
    }

    private mountRoutes(routes:Route[]): void {
              routes.forEach(route => {
                this.express.use('/', route.router);
            });
            }
}