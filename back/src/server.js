const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
require('dotenv').config()
const FacebookTokenStrategy = require('passport-facebook-token');
const jwt = require("jsonwebtoken");

const router = require("./router");

const app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URL;
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
}, function (accessToken, refreshToken, profile, done) {
    //todo salvar usuario

    const user = profile._json;

    const token = jwt.sign({ user }, process.env.PRIVATE_KEY, {
        expiresIn: "24h"
    });

    user.picture = profile.photos[0].value;

    return done(null, { profile: user, access_token: token });
}
));



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

app.use("/api", router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});