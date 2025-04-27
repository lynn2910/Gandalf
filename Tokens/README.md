# Projet "Tokens" 🔑 - Authentification avec JWT

## Démonstration Vidéo 📺

[Regarder la démo sur YouTube](https://youtu.be/JFBEWBJ5Qvg)

## Description 📖

Ce projet a été développé dans le cadre du cours "Services Web" et représente le **mini-projet numéro 2 du semestre**.
Son objectif principal est de mettre en œuvre un système d'**authentification moderne et sécurisée** basé sur les **JSON
Web Tokens (JWT)**.

Une caractéristique importante de ce mini-projet est qu'il s'**intègre directement au projet de la
SAE réalisé par le groupe n°1** (dont nous faisons partie).

L'idée est d'appliquer les concepts de JWT pour la
gestion des utilisateurs, l'authentification et le traitement du token côté client, en tirant parti de l'architecture et
des éléments existants du projet de la SAE.

## Fonctionnalités Clés ✨

Ce mini-projet d'authentification par JWT apporte les fonctionnalités essentielles suivantes :

* Il permet aux utilisateurs de **s'inscrire** pour créer un nouveau compte de manière sécurisée.
* Lors de la **connexion**, si les identifiants sont corrects, le serveur génère et renvoie un **token JWT** unique à
  l'utilisateur.
* Le serveur possède la capacité de **valider les tokens JWT** reçus dans les requêtes subséquentes pour authentifier
  l'utilisateur sans avoir à redemander son mot de passe.
* L'accès à la **page d'accueil** de l'application est **protégé** et requiert la présentation d'un token JWT valide par
  le client.
* La **gestion du token est assurée côté client** par l'application frontend. Le token JWT reçu est stocké dans le
  `LocalStorage` du navigateur et est utilisé pour authentifier les requêtes vers les routes protégées.

## Technologies Utilisées 🛠️

Ce projet s'appuie sur les technologies principales suivantes, venant compléter ou utiliser celles déjà en place dans le
projet SAE :

* **Frontend :** L'interface utilisateur est développée avec **Vue.js**.
* **Backend :** Le serveur utilise **Node.js** et le framework **Express.js**. L'authentification repose sur l'
  utilisation de **JSON Web Tokens (JWT)**.
* **Base de données :** Les données sont gérées par une base de données **MariaDB**, en utilisant l'ORM **Prisma** pour
  les interactions (la configuration de l'ORM est précisée dans le README.md du projet de SAE).
* **Stockage du token :** Le token JWT est conservé côté client dans le `LocalStorage` du navigateur.

## Instructions d'Installation et d'Exécution 🚀

Étant donné l'intégration de ce mini-projet dans le dépôt principal de la SAE du groupe n°1, les étapes d'installation
et d'exécution suivent en grande partie celles du projet principal.

### Cloner le dépôt principal du projet SAE (24hmans)

Commencez par cloner le dépôt du projet SAE qui contient ce mini-projet :

```bash
git clone --recurse-submodules https://github.com/lynn2910/Gandalf
cd Gandalf/Tokens/24hmans
```

<details>
  <summary>🔎 <b>Si vous n'avez pas utilisé le flag `--recurse-submodules` en clonant le rendu</b></summary>

Dans ce cas, ouvrez un terminal à la racine du dépôt, et exécutez ces deux commandes:

```shell
git submodule init
git submodule update --recursive --init
```

Le projet de SAE sera alors également cloné.

> **Note :** Le clonage prend du temps, car il y a des ressources lourdes à cloner.

---
</details>

### Consulter le README.md du projet SAE

Il est **indispensable de lire attentivement le fichier `README.md` situé à la racine du dépôt `Tokens/24hmans`**.
Ce fichier
contient toutes les instructions nécessaires pour configurer et exécuter l'ensemble du projet SAE.

## Auteurs 🧑‍💻

Ce mini-projet n°2 a été développé par:

* Cédric COLIN
* Marvyn LEVIN

Le projet de SAE a été développé par le **groupe n°1**, composé de :

* Cédric COLIN
* Marvyn LEVIN
* Anna GAIFFE
* Sugdenaz EKKICI
* Leslie MERAT

## Remarques 💡

Ce projet a été conçu dans un but purement **pédagogique**. Son objectif est de démontrer de manière pratique la mise en
place d'un système d'authentification basé sur les JSON Web Tokens (JWT), tout en s'**adaptant à la structure et en
capitalisant sur les éléments déjà mis en place dans le cadre du projet de la SAE**.
