# Créer la base de données

- [Créer la base de données](#créer-la-base-de-données)
  - [Prérequis](#prérequis)
    - [Si vous n'avez pas PostgreSQL](#si-vous-navez-pas-postgresql)
    - [Tester la connexion](#tester-la-connexion)
  - [Créer les modèles](#créer-les-modèles)
  - [Seeders](#seeders)
    - [Reservation](#reservation)
    - [Room](#room)
    - [Spot](#spot)
    - [User](#user)

## Prérequis

Vérifier que vous avez PostgreSQL installé sur votre machine.

- [PostgreSQL](https://www.postgresql.org/download/)
- [TablePlus](https://tableplus.com/)
- [Sequelize](https://sequelize.org/)

### Si vous n'avez pas PostgreSQL

```bash
brew install postgresql@15
```

TODO

Sequelize cli / Sequelize

```bash

## Sequelize

Documentation de sequelize : https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli

```bash
npm install --save pg pg-hstore
```

```bash
npm install --save sequelize
```

### Tester la connexion

Afin de vous assurer que la connexion à la base de données fonctionne, vous pouvez créer un fichier `db` à la racine du projet.

TODO

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres://username:password@localhost:5432/postgres");

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```

```bash
sequelize init
```

Cette commande crée 4 dossiers.

- `config`
- `migrations`
- `models`
- `seeders`

Les paramètres de connexion de notre base se situe dans `config/config.json`

```bash
sequelize db:create
```

![s](tableplus-connexion.png)

![s](tableplus-creation.png)


## Créer les modèles

```bash
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,user_role:string,user_password:string
```

```bash
npx sequelize-cli model:generate --name Reservation --attributes number_of_customers:integer,reservation_date:date,reservation_name:string,reservation_note:string,reservation_status:integer
```

```bash
npx sequelize-cli model:generate --name Room --attributes room_name:string
```

```bash
npx sequelize-cli model:generate --name Spot --attributes spot_name:string
```

creation de 4 fichiers dans le dossier `models` et 4 fichiers dans le dossier `migrations`

TODO: expliquer les fichiers de migrations

TODO: expliquer les fichiers de models

```bash
npx sequelize-cli db:migrate
```

## Seeders

Les seeds sont des fausses données de tests qui permettent de remplir la base de données.

```bash
npx sequelize-cli seed:generate --name user
npx sequelize-cli seed:generate --name reservation
npx sequelize-cli seed:generate --name spot
npx sequelize-cli seed:generate --name room
```

4 fichiers vont êtres créés dans le dossier `seeders`

### Reservation

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reservations', [{
      number_of_customers: 4,
      reservation_date: new Date(),
      reservation_name: "Alex",
      reservation_note: "Un menu végétarien",
      reservation_status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};

```

### Room

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rooms', [{
      room_name: "Salle 1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};

```

### Spot

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [{
      spot_name: "Le Bistrot de la Gare",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};

```

### User

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstName: "Alex",
      lastName: "Zerah",
      email: "pro@alexzerah.com",
      user_role: "client",
      user_password: "password en attente de hashage",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

```

```bash
npx sequelize-cli db:seed:all
```
