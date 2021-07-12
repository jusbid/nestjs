const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const DATA = [{ email: "test@gmail.com", password: "1234" }]

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize());

var opts = {}
opts.jwtFromRequest = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = 'secret';

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '826055221975-d7v96jalhgibvjapc2dum2vbs9om6lqf.apps.googleusercontent.com',
    clientSecret: '8ZQNQcARM7RUN-pzY0p85YkJ'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log(profile.displayName, 'profile.displayName ------------------------------');
    // console.log(profile);
    return done(false, profile)
}
));

app.post('/user/profile', passport.authenticate('googleToken', { session: false }), function (req, res) {
    return res.json(200, {  });
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Sever auth listening on port ${port}`)
})