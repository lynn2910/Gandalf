# Projet "Tokens" 🔑 - Authentification avec JWT (JSON Web Token)

## Description 📖

Ce projet, développé dans le cadre du cours "Services Web" à l'IUT, implémente un système d'authentification basé sur
JWT (JSON Web Token). Il permet la gestion des utilisateurs, l'authentification sécurisée et la gestion du token JWT
côté client. Ce projet est le mini-projet numéro 2 du semestre.

## Fonctionnalités ✨

Ce mini-projet offre les fonctionnalités suivantes :

* **Inscription d'utilisateurs :** ✍️ Les utilisateurs peuvent créer un compte sécurisé en fournissant les informations
  nécessaires (nom d'utilisateur, mot de passe, etc.).
* **Connexion avec génération de JWT :** 🔐 Les utilisateurs enregistrés peuvent se connecter et un token JWT est généré
  et renvoyé par le serveur.
* **Validation de JWT :** ✅ Le serveur valide les tokens JWT reçus pour authentifier les utilisateurs.
* **Page d'accueil sécurisée :** 🛡️ L'accès à la page d'accueil est protégé et nécessite un token JWT valide.
* **Gestion du token côté client :** 🍪 Le token JWT est stocké côté client (LocalStorage) et géré par
  le frontend (Vue.js).

## Technologies Utilisées 🛠️

* **Frontend:** Vue.js
* **Backend:**
    * Node.js avec Express.js
    * JSON Web Token (JWT)
* **Base de données:** MariaDB avec Prisma (ORM)
* **Stockage du token:** LocalStorage

## Installation et Exécution (Instructions générales) 🚀

Voici les étapes à suivre pour installer et exécuter le projet :

1. **Cloner le dépôt :** ⬇️
   ```bash
   git clone https://github.com/lynn2910/Gandalf.git
   cd Tokens
   ```
2. **Se référrer au `README.md` du dépôt `24hmans`**

## Auteurs 🧑‍💻

* Cédric COLIN
* Marvyn LEVIN

## Remarques 💡

Ce projet a été réalisé à des fins pédagogiques pour démontrer la mise en place d'un système d'authentification basé sur
les JWT.
Il constitue une base pour des applications web plus complexes et sécurisées.
