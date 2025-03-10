# Projet "Sessions" 🔑 - Système d'Authentification par Session

## Description 📖

Ce projet, développé dans le cadre du cours "Services Web" à l'IUT, implémente un système d'authentification complet
basé sur l'utilisation de sessions. Il permet de gérer les utilisateurs, de les authentifier et de sécuriser l'accès à
certaines ressources.

## Fonctionnalités ✨

Ce mini-projet offre les fonctionnalités suivantes :

* **Inscription d'utilisateurs :** ✍️ Les utilisateurs peuvent créer un compte sécurisé en fournissant les informations
  nécessaires (nom d'utilisateur, mot de passe, etc.).
* **Connexion sécurisée :** 🔐 Les utilisateurs enregistrés peuvent se connecter à leur espace personnel en fournissant
  leurs identifiants (nom d'utilisateur et mot de passe). Le système vérifie la validité de ces informations.
* **Déconnexion :** 👋 Les utilisateurs peuvent se déconnecter de leur session en toute sécurité.
* **Page Sécurisée :** 🛡️ Une page est accessible uniquement aux utilisateurs authentifiés. L'accès à cette page est
  protégé par le système de session.
* **Requête Authentifiée:** 🔄 Un bouton présent sur la page sécurisée permet de tester une requête qui nécessite
  l'authentification de l'utilisateur.
* **Gestion de session:** 🍪 La session est gérée de manière sécurisée, garantissant la persistance de la connexion de
  l'utilisateur entre les requêtes.

## Technologies Utilisées 🛠️

* **Frontend:** Vue.js, Tailwind CSS
* **Backend:** Node.js avec Express.js
* **Authentification:** Passport.js avec la stratégie `passport-local`
* **Base de données:** PostgresSQL avec Sequelize ORM
* **Sessions:** Gestion des sessions via cookies
* **Vuex:** Gère le state de l'application, et permet de stocker l'utilisateur courant

## Installation et Exécution (Instructions générales) 🚀

Voici les étapes à suivre pour installer et exécuter le projet :

1. **Cloner le dépôt :** ⬇️
   ```bash
   git clone https://github.com/lynn2910/Gandalf.git
   cd Sessions
   ```
2. **Installer les dépendances du frontend :** 📦
   ```bash
   cd frontend
   npm install #ou yarn install
   ```
3. **Installer les dépendances du backend :** 📦
   ```bash
   cd backend
   npm install #ou yarn install
   ```
4. **Configurer les variables d'environnement et la base de données :** ⚙️
    * **Fichier `.env` (backend):**
        * Dans le dossier `backend`, créer un fichier nommé `.env`.
        * Ajouter les lignes suivantes dans ce fichier :
          ```
          NODE_ENV="development"
          SECRET="<VOTRE_CLE_SECRETE>"
          ```
        * **Remplacer `<VOTRE_CLE_SECRETE>` par une clé secrète robuste.** 🔑 Vous pouvez en générer une avec la commande
          suivante dans votre terminal: `openssl rand -base64 50`. Cette clé sert à sécuriser les sessions et doit
          rester confidentielle.
    * **Fichier `src/config/config.json` (backend):**
        * Modifier le fichier `backend/src/config/config.json`
        * Remplacer les valeurs `username`, `password` et `database` de la section `development` par vos propres
          informations de connexion à la base de données PostgreSQL.
          ```json
          {
            "development": {
              "username": "<VOTRE_NOM_UTILISATEUR_BDD>",
              "password": "<VOTRE_MOT_DE_PASSE_BDD>",
              "database": "<VOTRE_NOM_BDD>",
              "host": "localhost",
              "port": 5432,
              "dialect": "postgres"
            },
            "test": {},
            "production": {}
          }
          ```
5. **Démarrer le serveur backend :** ▶️
   ```bash
   cd backend
   npm run start #ou node server.js , ou l'instruction approprié
   ```
6. **Démarrer le serveur frontend :** ▶️
   ```bash
   cd frontend
   npm run serve #ou yarn serve
   ```
7. **Accéder à l'application :** 🌐 Ouvrez votre navigateur et accédez à l'URL indiquée par le serveur frontend (
   généralement `http://localhost:8080`).

## Auteurs 🧑‍💻

* Cédric COLIN
* Marvyn LEVIN

## Remarques 💡

Ce projet a été réalisé à des fins pédagogiques pour démontrer la mise en place d'un système d'authentification basé sur
les sessions. Il constitue une base pour des applications web plus complexes et sécurisées.