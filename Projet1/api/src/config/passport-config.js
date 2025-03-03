const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function (passport, User) {

    passport.use(
        new LocalStrategy(
            {usernameField: 'emailId', passwordField: 'password'},
            async (email, password, done) => {
                try {
                    const user = await User.findOne({where: {emailId: email}});

                    if (!user) {
                        return done(null, false, {message: 'Email non enregistré'});
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return done(null, false, {message: 'Mot de passe incorrect'});
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};