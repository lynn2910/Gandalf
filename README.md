# Projet d'Authentification et de Gestion des Sessions

## Description Générale du Projet 📖

Ce projet pédagogique a pour objectif principal d'explorer et de mettre en pratique différentes stratégies d'
authentification et de gestion des sessions au sein d'applications web. Il est structuré autour de trois mini-projets
distincts, chacun abordant une méthode spécifique, tout en utilisant une architecture technique commune basée sur Vue.js
pour le frontend et Node.js pour le backend.

## Objectifs Pédagogiques Clés 🎯

À travers la réalisation de ces mini-projets, les objectifs d'apprentissage visés étaient les suivants :

* Comprendre et différencier les différentes méthodes d'authentification courantes dans le développement web.
* Maîtriser l'implémentation et la gestion des sessions utilisateur, notamment via les cookies et les JSON Web Tokens (
  JWT).
* Apprendre à intégrer et utiliser une authentification standardisée comme OAuth2 avec un fournisseur d'identité tiers (
  tel que Google).
* Développer un système de communication en temps réel, comme un module de chat.
* Explorer et mettre en œuvre des techniques d'optimisation, notamment la mise en cache avec Redis pour la gestion des
  sessions.

## Architecture Technique Générale 🏗️

L'architecture du projet est divisée en deux parties principales :

* **Frontend :** Développé avec **Vue.js**, il constitue l'interface utilisateur avec laquelle l'utilisateur interagit.
  Il gère l'affichage, la logique côté client, et les interactions avec le backend via des requêtes API et des
  WebSockets (pour le chat).
* **Backend :** Construit avec **Node.js** et le framework **Express.js**, il implémente la logique serveur, gère
  l'authentification, interagit avec la base de données et assure la communication en temps réel.

Chaque mini-projet adapte cette architecture générale en fonction de la technologie d'authentification et des
fonctionnalités spécifiques abordées.

## Structure du Dépôt 📁

Ce dépôt est organisé pour contenir le code source des trois mini-projets. L'organisation choisie consiste à créer un
dossier principal qui contient trois sous-dossiers, un pour chaque mini-projet (`mini-projet-1-sessions`,
`mini-projet-2-tokens`, `mini-projet-3-chat`), chacun contenant son propre frontend et backend.

```
.
├── README.md           (Ce fichier)
├── Sessions/
│   ├── backend/
│   ├── frontend/
│   └── README.md
├── Tokens/
│   ├── 24hmans/        (Le sous-dépôt contenant la SAE)
│   └── README.md       
└── mini-projet-3-chat/
    ├── backend/
    ├── frontend/
    └── README.md
```

## Mini-Projets et Démonstrations 🚀

Chaque mini-projet explore une facette de l'authentification et dispose de sa propre documentation détaillée (README)
ainsi qu'une vidéo de démonstration de ses fonctionnalités.

### Mini-projet 1 : Authentification avec Passport-Local et Sessions

* **Description :** Implémentation d'une authentification classique basée sur l'identifiant/mot de passe avec gestion
  des sessions via cookies.
* [Accéder au README détaillé de ce mini-projet](Sessions/README.md)
* [Regarder la démo sur YouTube](https://youtu.be/DY2VsaPwzW0)

### Mini-projet 2 : Authentification avec JWT (JSON Web Token)

* **Description :** Mise en place d'une authentification stateless utilisant les JSON Web Tokens, avec gestion du token
  côté client.
* [Accéder au README détaillé de ce mini-projet](Tokens/README.md)
* [Regarder la démo sur YouTube](https://youtu.be/JFBEWBJ5Qvg)

### Mini-projet 3 : Authentification OAuth2 et Chat en Temps Réel

* **Description :** Intégration de l'authentification via OAuth2 (Google) et développement d'un système de chat temps
  réel avec gestion des données et mise en cache.
* [Accéder au README détaillé de ce mini-projet](Chat/README.md)
* [Regarder la démo sur YouTube](https://youtu.be/NlRmwO79oRY)

## Installation et Exécution ⚙️

Pour installer et exécuter l'ensemble du projet, commencez par cloner ce dépôt:

```shell
git clone --recurse-submodules https://github.com/lynn2910/Gandalf
cd Gandalf
```

Ensuite, référez-vous aux instructions
détaillées fournies dans les fichiers `README.md` spécifiques à chaque mini-projet (`Sessions/README.md`,
`Tokens/README.md`, `Chat/README.md`) pour l'installation des dépendances et le lancement
des serveurs frontend et backend pour chaque partie.

N'oubliez pas de configurer les variables d'environnement nécessaires pour chaque mini-projet, comme indiqué dans leurs
READMEs respectifs (clés, secrets, identifiants de base de données, etc.).

## Auteurs 🧑‍💻

Ce projet a été réalisé par :

* Cédric COLIN
* Marvyn LEVIN
