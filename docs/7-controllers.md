# Controllers

- [Controllers](#controllers)
  - [Créer un contrôleur](#créer-un-contrôleur)
  - [`reservationController.js` (Controller pour les reserverations)](#reservationcontrollerjs-controller-pour-les-reserverations)
  - [Les routes](#les-routes)
    - [Mettre a jour les imports](#mettre-a-jour-les-imports)
      - [`index.js`](#indexjs)
      - [`app.js`](#appjs)
      - [`reservationsRoute.js`](#reservationsroutejs)
  - [A vous de jouer](#a-vous-de-jouer)
    - [Reserverations](#reserverations)
    - [Autres modèles](#autres-modèles)
  - [Aller plus loin](#aller-plus-loin)


Les contrôleurs sont des classes qui gèrent les requêtes HTTP entrantes. Ils sont responsables de la récupération des données, de la logique métier et de la génération des réponses.

## Créer un contrôleur

Créer un dossier `controllers` à la racine du projet.

## `reservationController.js` (Controller pour les reserverations)

Créer un fichier `reservationController.js` dans le dossier `controllers`.

```js

// Importation des modèles Sequelize basé sur le fichier index.js
const { Reservation, Table, Client } = require('../models');

// Fonction pour créer une réservation
exports.createReservation = async (req, res) => {
    try {
        const { clientId, tableId, date, time } = req.body;
        // Ajouter des vérifications ici, par exemple, vérifier la disponibilité de la table

        const newReservation = await Reservation.create({
            clientId,
            tableId,
            date,
            time
        });

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Contrôleur pour obtenir la liste des réservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [Table, Client] // Pour inclure des détails sur la table et le client
        });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ajouter d'autres méthodes au besoin, par exemple, pour mettre à jour ou annuler une réservation
```

Nous avons :

- Import du modèle
- 🔧 Fonction pour créer une réservation
- `try catch`
- Récupération des données de la requête
- Création d'une nouvelle réservation
- Renvoyer une réponse
- 🔧 Fonction pour obtenir la liste des réservations

## Les routes

Dans le dossier routes, renommer les routes comme indiqué ci-dessous :

- `reservationsRoute.js`
- `roomsRoute.js`
- `spotsRoute.js`
- `usersRoute.js`

### Mettre a jour les imports

#### `index.js`

```js
const reservationsRouter = require('./reservationsRoute');
const usersRouter = require('./usersRoute');
const spotsRouter = require('./spotsRoute');
const roomsRouter = require('./roomsRoute');
```

#### `app.js`

```js
const indexRouter = require('./routes/indexRoute');
const authRouter = require('./routes/authRoute');
```

#### `reservationsRoute.js`

```js
 const reservationController = require('../controllers/reservationController');

 // ...

 router.post('/reservations', reservationController.createReservation);

```

Désormais, le modèle traite avec le contrôleur, et le contrôleur traite avec les routes.

## A vous de jouer

Continuez à implémenter les contrôleurs pour reservation les autres modèles.

### Reserverations

- `getReservations`
- `updateReservation`
- `deleteReservation`
- `abortReservation`

### Autres modèles

- `roomController.js`
- `spotController.js`
- `userController.js`
- `authController.js`

## Aller plus loin

- Implémenter des tests unitaires pour les contrôleurs
- Implémenter des tests d'intégration pour les routes
- Implémenter des services pour les contrôleurs
- Adapter les contrôleurs à la programmation orientée objet.
