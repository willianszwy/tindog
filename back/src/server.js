const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
require('dotenv').config()
const FacebookTokenStrategy = require('passport-facebook-token');
const jwt = require("jsonwebtoken");

const router = require("./router");
const User = require("./models/user");

const app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("success connect db");
});
var db = mongoose.connection;

var corsOptions = {
    origin: "https://localhost:3000"
};

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0'
}, async (accessToken, refreshToken, profile, done) => {

    try {

        let user = await User.findOne({ 'facebook_id': profile.id });

        if (!user) {
            const { id: facebook_id, name: nome, email } = profile._json;
            const avatar = profile.photos[0].value;
            user = await User.create({
                email, facebook_id, nome, avatar
            });

            await user.save();
        }

        const token = jwt.sign({ user }, process.env.PRIVATE_KEY, {
            expiresIn: "24h"
        });

        return done(null, { profile: user, access_token: token, facebook_token: accessToken });


    } catch (error) {
        console.log(error);
        done(error, false, error.message)
    }
}));

app.use(passport.initialize());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth/facebook/token',
    passport.authenticate('facebook-token', { session: false }),
    (req, res) => {
        res.status(req.user ? 200 : 401).send(req.user);
    },
    (error, req, res, next) => {
        if (error) {
            res.status(401);
        }
    }
);
app.use(express.static('public'));
app.use("/api", router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});