# Brief v2

- [Brief v2](#brief-v2)
  - [Objectifs](#objectifs)
    - [Priorités (à titre indicatif)](#priorités-à-titre-indicatif)
    - [Features](#features)
      - [Routes](#routes)
      - [usage](#usage)
      - [Déploiement](#déploiement)
    - [Technique](#technique)
      - [Base de données](#base-de-données)
      - [Tests](#tests)
      - [Architecture](#architecture)
    - [Amélioration](#amélioration)
    - [Bonnes pratiques](#bonnes-pratiques)
      - [Général](#général)
      - [Sécurité](#sécurité)
      - [Lisibilité](#lisibilité)
      - [Documentation](#documentation)
      - [Git](#git)

## Objectifs

- En utilisant [l'approche TDD](tdd.md), vous devez

### Priorités (à titre indicatif)

- ⚡️ : Eclair - Priorité 1
- ☄️ : Météorite - Priorité 2
- 🪐 : Planète - Priorité 3

### Features

#### Routes

>> ⚠️ Les routes indiquées ici sont faites à titre d'exemple, vous pouvez les modifier à votre guise.

- [ ] ⚡️ Ajouter une route `GET /users/me` qui renvoie les informations de l'utilisateur connecté.
- [ ] ⚡️ Un utilisateur ne peut pas créer un compte avec un email existant `POST /signup`.
- [ ] ⚡️ Un utilisateur qui crée son compte doit avoir un email valide `POST /signup` (#regexp).
- [ ] ⚡️ Vérifier que la récuperation des utilisateurs `GET /users` n'est possible que pour un utilisateur qui a le role admin.
- [ ] ⚡️ Un utilisateur ne peut pas reserver une table de restaurant qui est déja réservée `POST /reservations`.

#### usage

- [ ] ☄️ Connecter un front-end (ou application mobile✨) à l'API.
- [ ] 🪐 Implémenter Socket.io pour permettre aux utilisateurs de communiquer en temps réel.

#### Déploiement

- [ ] 🪐 Mettre en production le serveur Node.js

### Technique

#### Base de données

- [ ] 🪐 Utiliser l'ORM Prisma pour remplacer sequelize.

#### Tests

- [ ] ⚡️ Implémenter une base de données de tests.
- [ ] ⚡️ Ajouter des seeds pour les utilisateurs, les réservations, les rooms et les spots.

#### Architecture

- [ ] ☄️ Présenter un schéma de la base de données.
- [ ] ☄️ Présenter un diagramme de l'architecture de l'API.

### Amélioration

### Bonnes pratiques

- [GitHub - Node best practise](https://github.com/goldbergyoni/nodebestpractices)

#### Général

- [ ] ☄️ Gerer les erreurs du code (`try catch`).

#### Sécurité

- [ ] ☄️ Utiliser les variables d'environnement pour les informations sensibles (clé secrète, connexion à la base de données, etc.).

#### Lisibilité

- [ ] ☄️ Implémenter prettier et eslint pour formater le code et le rendre plus lisible.

#### Documentation

- [ ] ⚡️ Implémenter un `README` à la racine du projet qui explique comment installer et utiliser l'API.
- [ ] ⚡️ Mettre en place Swagger pour documenter l'API.

#### Git

- [ ] ☄️ Implémenter husky pour executer `npm test` automatiquement avant chaque commit hooks (tests).
- [ ] ☄️ Mettre en place un processus de traitement git (branches, commit...), comme par exemple (git flow).
