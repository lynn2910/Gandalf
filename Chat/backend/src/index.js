require('dotenv').config();

const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require("./models/User");
require("./models/Chat");
const passport = require('passport');
require("./config/passport-config")

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur MongoDB:', err));

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log('Utilisateur:', req.user);
    next();
});

require('./routes/authRoutes')(app);
require('./routes/chatRoutes')(app);

app.get('/', (req, res) => {
    res.send('Salut!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port: `, PORT);
});