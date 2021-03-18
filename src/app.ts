import {Request,Response,Router}from 'express';
import * as express from 'express';
import {User} from "./models/user";
import * as passport from "passport"
import * as passportLocal from "passport-local"
import * as session from "express-session";
import * as bodyParser from "body-parser"
import * as flash from "connect-flash"
import {Recipe} from "./models/recipe";
import {DatabaseInitiator} from "./databaseInitiator";
import Route from "./interfaces/route.interface";

export class App {

    public express;
    constructor(routes:Route[]) {
        this.express = express();

        this.initPassport();
        this.mountRoutes(routes);
    }
    private mountRoutes(routes:Route[]): void {
              routes.forEach(route => {
                this.express.use('/', route.router);
            });
            }

    private initPassport():void{
        this.express.use(bodyParser.json());

        this.express.use(session({ cookie: { maxAge: 60* 60* 1000 },
            secret: 'woot',
            resave: false,
            saveUninitialized: false}));
        this.express.use(flash());


        passport.use(new passportLocal.Strategy(
            async function(username, password, done) {
                const foundUser = await User.findOne({username:username});
                return done(null, foundUser);
            }
        ));

        passport.serializeUser(function(user:User, done) {
            done(null, user.id);
        });

        passport.deserializeUser(async function(id, done) {
            const foundUser = await User.findOne(id);
            done(null, foundUser);
        });



        this.express.use(passport.initialize());
        this.express.use(passport.session());
    }
}