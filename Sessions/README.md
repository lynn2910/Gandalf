# Projet "Sessions" 🔑 - Système d'Authentification par Session

## Démonstration Vidéo 📺

https://youtu.be/DY2VsaPwzW0

## Description 📖

Ce mini-projet a été conçu dans le cadre du cours "Services Web" à l'IUT. Son objectif principal est de mettre en place
un **système d'authentification complet basé sur l'utilisation de sessions**. Il gère le cycle de vie des utilisateurs,
de l'inscription à la déconnexion, et sécurise l'accès à certaines parties de l'application.

## Fonctionnalités Clés ✨

Ce système d'authentification par session offre les capacités suivantes :

* Il permet aux utilisateurs de **s'inscrire** en créant un compte sécurisé avec leurs informations.
* Les utilisateurs enregistrés peuvent ensuite se **connecter** de manière sécurisée en fournissant leurs identifiants.
  Le système valide ces informations pour autoriser l'accès.
* Une option de **déconnexion** est disponible pour permettre aux utilisateurs de quitter leur session en toute
  sécurité.
* Une **page dédiée est sécurisée** et n'est accessible qu'aux utilisateurs ayant une session active et authentifiée.
* Sur cette page sécurisée, un mécanisme permet de réaliser une **requête authentifiée**, démontrant la protection des
  endpoints nécessitant une connexion valide.
* La **gestion des sessions** est mise en œuvre pour assurer la persistance de l'état de connexion de l'utilisateur.
  Cette gestion s'appuie spécifiquement sur l'utilisation de **cookies** pour suivre la session entre les différentes
  requêtes.

## Technologies Utilisées 🛠️

Le développement de ce projet s'appuie sur les technologies suivantes :

* **Frontend :** Réalisé avec Vue.js pour l'interface utilisateur et stylisé à l'aide de Tailwind CSS.
* **Backend :** Construit avec Node.js et le framework Express.js.
* **Authentification :** Gérée via la bibliothèque Passport.js, en utilisant la stratégie locale (`passport-local`).
* **Base de données :** Le stockage des données (utilisateurs) est assuré par une base de données relationnelle. Le
  projet est configuré pour utiliser **PostgreSQL** avec l'ORM Sequelize, bien qu'il puisse être adapté pour utiliser *
  *MySQL** également avec Sequelize.
* **Sessions :** La gestion de l'état de la session utilisateur est implémentée via des cookies.
* **State Management (Frontend) :** Vuex est utilisé pour gérer l'état global de l'application côté client, notamment
  pour stocker les informations sur l'utilisateur actuellement connecté.

## Instructions d'Installation et d'Exécution 🚀

Pour installer et lancer ce projet, suivez les étapes ci-dessous :

### Cloner le dépôt

Commencez par cloner le code source du projet depuis son dépôt :

```bash
git clone https://github.com/lynn2910/Gandalf.git
cd Gandalf
cd Sessions
```

### Installer les dépendances du frontend

Naviguez dans le dossier `frontend` et installez les paquets nécessaires :

```bash
cd frontend
npm install
# ou si vous utilisez Yarn
# yarn install
```

### Installer les dépendances du backend

De même, accédez au dossier `backend` et installez ses dépendances :

```bash
cd ../backend # Si vous êtes toujours dans le dossier frontend
npm install
# ou si vous utilisez Yarn
# yarn install
```

### Configurer les variables d'environnement et la base de données

Une configuration est requise pour lier le backend à la base de données et sécuriser les sessions.

#### Configuration du fichier .env (backend)

Dans le dossier `backend`, créez un fichier nommé `.env`. Ajoutez les lignes suivantes :

```dotenv
SESSION_SECRET=<VOTRE_CLE_SECRETE>
NODE_ENV=development
```

**Important :** Remplacez `<VOTRE_CLE_SECRETE>` par une chaîne de caractères unique et complexe. Cette clé est cruciale
pour sécuriser les sessions et ne doit jamais être partagée. Vous pouvez en générer une via la commande
`openssl rand -base64 50` dans votre terminal. La variable `NODE_ENV` spécifie l'environnement de développement.

#### Configuration du fichier .env (frontend)

Dans le dossier `frontend`, si ce n'est pas déjà fait, créez un fichier `.env` et ajoutez-y la ligne suivante :

```dotenv
VUE_APP_AXIOS_BASE_URL="http://localhost:3000"
```

Cette variable définit l'URL de base utilisée par Axios pour communiquer avec le backend. Adaptez le port (ici 3000) si
votre serveur backend écoute sur un autre port.

#### Configuration du fichier src/config/config.json (backend)

Éditez le fichier `backend/src/config/config.json`. Modifiez les valeurs `username`, `password`, et `database` dans la
section `development` pour correspondre à vos identifiants et au nom de votre base de données PostgreSQL (ou MySQL).
Assurez-vous que la base de données est déjà créée. La configuration devrait ressembler à ceci :

```json
{
  "development": {
    "username": "<VOTRE_NOM_UTILISATEUR_BDD>",
    "password": "<VOTRE_MOT_DE_PASSE_BDD>",
    "database": "<NOM_DE_VOTRE_BASE_DE_DONNEES>",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {},
  "production": {}
}
```

### Démarrer le serveur backend

Depuis le dossier `backend`, lancez le serveur :

```bash
npm run dev
# ou
# yarn dev
```

Le serveur backend devrait démarrer et écouter sur le port configuré (par défaut 3000).

### Démarrer le serveur frontend

Ouvrez un nouveau terminal, accédez au dossier `frontend` et démarrez l'application Vue.js :

```bash
cd frontend
npm run serve
# ou
# yarn serve
```

Le serveur frontend sera accessible, généralement sur `http://localhost:8080`.

### Accéder à l'application

Ouvrez votre navigateur web et naviguez vers l'adresse indiquée par le serveur frontend (probablement
`http://localhost:8080`) pour accéder à l'application.

## Auteurs 🧑‍💻

Ce projet a été développé par :

* Cédric COLIN
* Marvyn LEVIN

## Remarques 💡

Ce projet a été créé avec un objectif pédagogique, servant de démonstration pratique pour la mise en place d'un
*système d'authentification basé sur les sessions*.