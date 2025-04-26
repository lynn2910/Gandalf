const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate("google", {
            failureRedirect: '/auth/login-failed'
        }),
        (req, res) => {
            res.redirect('http://localhost:3000/chat');
        }
    );

    app.get(
        '/auth/discord',
        passport.authenticate("discord", {
            scope: ["identify", "email"]
        })
    );

    app.get(
        '/auth/discord/callback',
        passport.authenticate("discord", {
            failureRedirect: '/auth/login-failed'
        }),
        (req, res) => {
            res.redirect('http://localhost:3000/chat');
        }
    );

    app.get('/auth/logout', (req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).send('Erreur de déconnexion');
            res.redirect('http://localhost:3000/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
