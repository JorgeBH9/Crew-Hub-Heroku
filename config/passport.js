//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

//This is to be use with the login
passport.use("login", new LocalStrategy(
    function (userName, password, done) {
        db.User.findOne({
            where: {
                userName
            }
        }).then(function (dbUser) {
            // If there's no user with the given email
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect User Name."
                });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect Password."
                });
            }
            // If none of the above, return the user
            return done(null, dbUser);
        });
    }
));

// passport.use("signup", new LocalStrategy(
//     function (req, username, password, done) {
//         console.log(req.body);
//         db.User.create({
//             username,
//             password,
//             userBio: ""
//         }).then(function (user) {
//             return done(null, user);
//             // res.redirect("/");
//         }).catch(function (err) {
//             console.log(err);
//             return done(null, false, req.flash("message", "Something went wrong"));
//         });
//         //res.status(422).json(err.errors[0].message);
//     }
// ));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

//
// Exporting our configured passport
module.exports = passport;