import 'reflect-metadata';
import { createConnection } from 'typeorm';

import {App}from './app'
import {User} from "./models/user";
const port = process.env.PORT || 3000;
const app = new App();

createConnection().then(async connection => {
app.express.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
        process.abort();
    }
    console.log(`Server is listening on port ${port}.`);
    return;
});

const user = new User();

user.username = "Dennis";
user.servingsize = 1;
user.planday ="Montag";
user.password="1234";
user.email="test@test.de";
await user.save();

const allUsers = await User.find();
const firstUser = await User.findOne(1);
const timber = await User.findOne({ username: "Dennis", servingsize: 1 });

//await timber.remove();
});