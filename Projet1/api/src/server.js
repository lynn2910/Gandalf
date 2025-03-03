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

const User = models.User;

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


app.post('/register', async (req, res) => {
    const {username, emailId, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email: emailId,
            password: hashedPassword
        });
        res.status(201).json({message: 'Utilisateur enregistré avec succès', user: newUser});
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({message: 'Erreur lors de l\'inscription', error: error});
    }
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
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
                success: true, message: 'Connexion réussie', user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    })(req, res, next);
});

app.get('/login', (req, res) => {
    res.send('Page de Login (POST sur /login pour se connecter)');
});

app.get('/secure', ensureAuthenticated, (req, res) => {
    res.send(req.user);
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

app.get('/', (req, res) => { // Route d'accueil publique
    res.send('Page d\'accueil publique. <a href="/login">Se connecter</a> ou <a href="/register">S\'inscrire</a>');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


app.listen(
    3000,
    () => {
        console.log("Serveur écoute sur port 3000");
    }
)