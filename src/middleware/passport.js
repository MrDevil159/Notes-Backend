const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../model/user");

const secretKey = process.env.SECRET_TOKEN;

const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);
