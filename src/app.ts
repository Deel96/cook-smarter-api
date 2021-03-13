import {Request,Response,Router}from 'express';
import * as express from 'express';
import {User} from "./models/user";
import * as passport from "passport"
import * as passportLocal from "passport-local"
import * as session from "express-session";
import * as bodyParser from "body-parser"
import * as flash from "connect-flash"
import {userInfo} from "os";
import {Recipe} from "./models/recipe";

export class App {

    public express;
    constructor() {
        this.express = express();

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

        this.mountRoutes();
    }
    private mountRoutes(): void {
        const router = Router();


        router.get('/', async (req, res) => {
            res.json({ message: await User.findOne(1)});

        });


        router.get('/users/:id', async (req:Request, res) => {
            req.user
            res.json({message: await User.findOne(req.params.id)});
        })

        router.post('/login',
            passport.authenticate('local'), function(req,res){
                res.send('Hello login!')
            }
        );


        router.get('/foodplan', async (req:Request, res) => {
            res.json( await User.findOne(req.params.id));
        })

        router.get('/recipes', async (req:Request, res) => {
            res.json(await Recipe.find());
        })

        router.get('/recipes/:id', async (req:Request, res) => {
            res.json(await Recipe.findOne(req.params.id));
        })

        router.get('/me/recipes', async (req:Request, res) => {
            const user:any = req.user;


            res.json(await Recipe.find({author:user.username}));
        })

        this.express.use('/', router);
    }
}