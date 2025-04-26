const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
            res.redirect('http://localhost:8080/secured');
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
            res.redirect('http://localhost:8080/secured');
        }
    );

    app.get('/auth/logout', (req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).json({ message: 'Erreur de déconnexion' });
            return res.status(200).json({ message: 'Déconnexion réussie' });
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    // Local authentication routes
    app.post('/auth/register', async (req, res) => {
        try {
            const { email, password, displayName } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = new User({
                email,
                password: hashedPassword,
                displayName,
                localAuth: true
            });

            await newUser.save();

            // Log in the user after registration
            req.login(newUser, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de la connexion après inscription' });
                }
                return res.status(201).json({
                    message: 'Inscription réussie',
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        displayName: newUser.displayName
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        }
    });

    app.post('/auth/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message || 'Échec de l\'authentification' });
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.json({
                    message: 'Connexion réussie',
                    user: {
                        id: user.id,
                        email: user.email,
                        displayName: user.displayName
                    }
                });
            });
        })(req, res, next);
    });
};
