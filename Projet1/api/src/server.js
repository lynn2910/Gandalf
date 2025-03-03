const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const dotenv = require("dotenv");
dotenv.config();
console.log("Secret: ", process.env.SECRET);

//
//
//  AUTHENTIFICATION
//
//

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Models
const models = require("./models");
const bcrypt = require("bcrypt");

const User = models.user;

require('./config/passport-config')(passport, User);

models.sequelize.sync().then(
    () => {
        console.log("BDD fonctionne bien");
    },
    console.error
);

//
//
//  ROUTES
//
//


app.post('/register', async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        console.log("password: ", req.body);
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            username, email,
            password: hashedPassword
        });

        req.logIn(newUser, (err) => {
            if (err) {
                return next(err);
            }

            // Connexion réussie après inscription
            return res.status(201).json({
                success: true,
                message: 'Inscription et connexion réussies',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({message: 'Erreur lors de l\'inscription', error: error});
    }
});

app.post('/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err)
            return next(err);
        }
        if (!user) {
            // Échec de l'authentification
            return res.status(401).json({success: false, message: info.message});
        }

        // Authentification réussie
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({
                success: true,
                message: 'Connexion réussie',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    })(req, res, next);
});

app.get('/user', ensureAuthenticated, (req, res) => {
    res.json(req.user);
});

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({message: 'Erreur lors de la déconnexion'});
        }
        res.redirect('/');
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({message: "You are not authenticated"});
}


app.listen(
    3000,
    () => {
        console.log("Serveur écoute sur port 3000");
    }
)