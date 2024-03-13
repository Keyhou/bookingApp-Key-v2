# Tests

## Qu'est-ce qu'un test ?

Un test est un morceau de code qui permet de vérifier le bon fonctionnement du code de manière automatique.

Il existe plusieurs types de tests. Ceux qui nous intéressent sonr

- **Tests unitaires**: Avec Jest, `expect(add(1, 2)).toBe(3)` vérifie si la fonction `add` retourne 3.
- **Tests d'intégration**: Utilisez Supertest pour tester si `GET /users` renvoie un statut `200` et un tableau d'utilisateurs.
- **Tests fonctionnels**: Supertest effectue un GET /products puis vérifie si la liste renvoyée correspond à des critères fonctionnels spécifiques (filtrage, tri).

## Installation de [jest](https://jestjs.io) et supertest

```bash
npm install --save-dev jest supertest
```

## Configuration de jest

Ajouter la section suivante à votre `package.json`:

```json
  "scripts": {
    "test": "jest"
  },
```

Créer un dossier `__tests__` à la racine du projet.

Ajouter le fichier `app.test.js` dans le dossier `__tests__`.

```js
const request = require('supertest');
const app = require('../app');

describe('GET /api/reservations', () => {
  it('should return a 401 error', async () => {
    const res = await request(app)
      .get('/api/reservations')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
```

Ici on veut tester si la route `GET /api/reservations` renvoie bien une erreur 401 lorsque l'utilisateur n'est pas connecté.

## Exécuter les tests

```bash
npm test
```
