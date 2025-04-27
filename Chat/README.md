# Projet "Chat" 💬 - Authentification OAuth2 et Chat en Temps Réel

## Démonstration Vidéo 📺

[Regarder la démo sur YouTube](https://youtu.be/NlRmwO79oRY)

## Description 📖

Ce projet a été développé dans le cadre du cours "Services Web" à l'IUT.
Il intègre deux fonctionnalités principales : un système d'**authentification utilisant le protocole OAuth2 via Google
et Discord** et un **système de messagerie instantanée (chat) en temps réel** permettant aux utilisateurs connectés de
communiquer.
L'objectif de ce projet est d'explorer et d'appliquer l'authentification standardisée via OAuth2 et de comprendre les
mécanismes sous-jacents à un chat en temps réel.

## Fonctionnalités Clés ✨

Ce mini-projet propose les fonctionnalités essentielles suivantes :

* Les utilisateurs peuvent s'authentifier et accéder à l'application en utilisant leur **compte Google ou Discord**
  grâce à l'intégration OAuth2 (ou bien grâce à un email et mot de passe).
* Les informations relatives aux utilisateurs authentifiés ainsi que leurs tokens d'accès sont enregistrés et gérés dans
  une base de données **MongoDB**.
* Pour optimiser les performances, les sessions des utilisateurs sont stockées temporairement et gérées efficacement
  grâce à un système de **mise en cache utilisant Redis**.
* Une fois connectés, les utilisateurs peuvent **échanger des messages en temps réel** via l'interface de chat intégrée.
* Un **historique des messages** est conservé et stocké durablement dans la base de données **MongoDB**.

## Technologies Utilisées 🛠️

Le développement de ce projet a nécessité l'utilisation des technologies principales suivantes :

* **Frontend :** L'interface utilisateur est construite avec **Vue.js**.
* **Backend :** Le serveur est développé avec **Node.js** et le framework **Express.js**. L'authentification est gérée
  par **Passport.js**, spécifiquement configuré avec les stratégies pour OAuth2 Google.
* **Base de données :** **MongoDB** est utilisé pour le stockage persistant des données (utilisateurs, messages),
  interfacé via Mongoose.
* **Mise en cache :** **Redis** est employé pour la mise en cache des sessions, améliorant la réactivité de
  l'application.
* **WebSockets :** La communication en temps réel pour le chat est assurée par la bibliothèque **Socket.io**.

## Instructions d'Installation et d'Exécution 🚀

Pour installer et lancer ce mini-projet, veuillez suivre ces étapes générales :

### Cloner le dépôt

Commencez par cloner le code source du projet.

```bash
git clone https://github.com/lynn2910/Gandalf.git
cd Chat
```

### Installer les dépendances du frontend

Accédez au répertoire du frontend et installez les dépendances :

```bash
cd frontend
npm install # ou yarn install
```

### Installer les dépendances du backend

Naviguez dans le répertoire du backend et installez ses dépendances :

```bash
cd ../backend # Si vous étiez dans le dossier frontend
npm install # ou yarn install
```

### Configurer les variables d'environnement

Une configuration est nécessaire pour lier le backend à vos services et sécuriser l'application.

#### Configuration du fichier .env (backend)

Dans le dossier `backend`, créez un fichier nommé `.env` et ajoutez-y les variables suivantes, en remplaçant les valeurs
entre guillemets (`""`) par vos propres informations :

```env
GOOGLE_CLIENT_ID="" # Votre ID client obtenu depuis la Google Cloud Console pour OAuth2
GOOGLE_CLIENT_SECRET="" # Votre secret client obtenu depuis la Google Cloud Console
GOOGLE_CALLBACK_URL="http://localhost:5000/auth/google/callback" # L'URL de callback enregistrée dans la Google Cloud Console
DISCORD_CLIENT_ID="" # ID client Discord si l'authentification Discord est configurée
DISCORD_CLIENT_SECRET="" # Secret client Discord
DISCORD_CALLBACK_URL="http://localhost:5000/auth/discord/callback" # URL de callback Discord
MONGO_URI="mongodb://localhost:27017/auth-google-tp" # L'URI de connexion à votre base de données MongoDB
COOKIE_KEY="" # Une clé secrète robuste pour signer les cookies (générez-la par exemple avec `openssl rand -base64 50`)
REDIS_URL="redis://127.0.0.1:6379" # L'URL de connexion à votre serveur Redis
```

Vous devrez obtenir les identifiants `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` en créant un projet et des
identifiants OAuth2 dans la Google Cloud Console.

#### Configuration du fichier .env (frontend)

Dans le dossier `frontend`, créez ou modifiez le fichier `.env` pour y inclure les variables d'environnement pour le
frontend :

```env
VUE_APP_AXIOS_BASE_URL=http://localhost:5000 # L'URL de base pour les appels API vers le backend
VUE_APP_SOCKET_URL=http://localhost:5000 # L'URL pour la connexion Socket.io au backend (pour le chat en temps réel)
```

### Démarrer le serveur Redis

Assurez-vous que Redis est installé sur votre système et lancez le serveur. Par défaut, il écoute sur le port 6379.

```bash
redis-server
```

### Démarrer le serveur backend

Depuis le dossier `backend`, lancez le serveur :

```bash
npm run serve
```

Le serveur backend devrait démarrer et gérer l'authentification, les sessions et la logique du chat.

### Démarrer le serveur frontend

Ouvrez un nouveau terminal, accédez au dossier `frontend` et démarrez l'application Vue.js :

```bash
cd frontend
npm run serve # ou yarn serve
```

Le serveur frontend sera accessible à l'adresse `http://localhost:8080`.

### Accéder à l'application

Ouvrez votre navigateur web et naviguez vers l'adresse affichée par le serveur frontend
([http://localhost:8080](http://localhost:8080)) pour utiliser l'application.

## Auteurs 🧑‍💻

Ce projet a été réalisé par :

* Cédric COLIN
* Marvyn LEVIN