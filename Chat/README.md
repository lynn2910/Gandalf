# Projet "Chat" 💬 - Authentification OAuth2 et Chat en Temps Réel

## Description 📖

Ce projet, développé dans le cadre du cours "Services Web" à l'IUT, implémente un système d'authentification OAuth2 via
Google. Il intègre également un système de messagerie
instantanée (chat) en temps réel entre les utilisateurs connectés. Ce projet est le mini-projet numéro 3 du semestre.

## Fonctionnalités ✨

Ce mini-projet offre les fonctionnalités suivantes :

* **Authentification OAuth2 via Google:** 🔑 Les utilisateurs peuvent s'authentifier en utilisant leur compte Google.
* **Stockage des utilisateurs et tokens:** 💾 Les informations des utilisateurs et leurs tokens d'accès sont stockés dans
  une base de données MongoDB.
* **Mise en cache des sessions:** ⚡ Les sessions des utilisateurs sont mises en cache à l'aide de Redis pour une
  meilleure performance.
* **Chat en temps réel:** 🗣️ Les utilisateurs connectés peuvent échanger des messages en temps réel.
* **Historique des messages:** 📜 L'historique des messages échangés est stocké dans la base de données MongoDB.

## Technologies Utilisées 🛠️

* **Frontend:** Vue.js
* **Backend:**
    * Node.js avec Express.js
    * Passport.js (avec les stratégies OAuth2 pour Google)
* **Base de données:** MongoDB avec Mongoose
* **Mise en cache:** Redis
* **WebSockets:** Socket.io

## Installation et Exécution (Instructions générales) 🚀

Voici les étapes à suivre pour installer et exécuter le projet :

1. **Cloner le dépôt :** ⬇️
   ```bash
   git clone https://github.com/lynn2910/Gandalf.git
   cd Chat
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
4. **Configurer les variables d'environnement :** ⚙️
    * **Fichier `.env` (backend):**
        * Dans le dossier `backend`, créer un fichier nommé `.env`.
        * Ajouter les variables d'environnement suivantes, en remplaçant les valeurs entre `<>` par vos propres
          informations.
      ```
      NODE_ENV="development"
      GOOGLE_CLIENT_ID="<VOTRE_GOOGLE_CLIENT_ID>"
      GOOGLE_CLIENT_SECRET="<VOTRE_GOOGLE_CLIENT_SECRET>"

      COOKIE_KEY="<CLE_SECRETE>"

      MONGO_URI="mongodb://<VOTRE_MONGO_USER>:<VOTRE_MONGO_PASSWORD>@<VOTRE_MONGO_HOST>:<VOTRE_MONGO_PORT>/<VOTRE_MONGO_DATABASE>" # Ex : mongodb://localhost:27017/chat_db
      REDIS_URL="<VOTRE_REDIS_HOST>" # Exemple: "redis://127.0.0.1:6379"
      ```
        * **Conseil :** Utilisez `openssl rand -base64 50` pour générer une clé secrète robuste pour `COOKIE_KEY`.
    * **Créer un projet et avoir ses identifiant pour les fournisseurs OAuth2**.
5. **Démarrer le serveur Redis :** ⚡
    * S'assurer que Redis est installé sur votre machine.
    * Démarrer le serveur Redis en utilisant la commande : `redis-server`
6. **Démarrer le serveur backend :** ▶️
   ```bash
   cd backend
   npm run start #ou node server.js , ou l'instruction approprié
   ```
7. **Démarrer le serveur frontend :** ▶️
   ```bash
   cd frontend
   npm run serve #ou yarn serve
   ```
8. **Accéder à l'application :** 🌐 Ouvrez votre navigateur et accédez à l'URL indiquée par le serveur frontend (
   généralement `http://localhost:8080`).

## Auteurs 🧑‍💻

* Cédric COLIN
* Marvyn LEVIN

## Remarques 💡

Ce projet a été réalisé à des fins pédagogiques pour démontrer la mise en place d'un système d'authentification OAuth2
et d'un chat en temps réel. Il constitue une base pour des applications web plus complexes et interactives.
