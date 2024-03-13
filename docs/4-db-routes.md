# Lier routes et base de données

- [Lier routes et base de données](#lier-routes-et-base-de-données)

Par exemple, une route qui permet de récupérer toutes les réservations:

```js
const Reservation = require("./models/reservation")(sequelize, DataTypes);
const Room = require("./models/room")(sequelize, DataTypes);
const Spot = require("./models/spot")(sequelize, DataTypes);
const User = require("./models/user")(sequelize, DataTypes);
```

```js
router.get('/', async function(req, res, next) {

  try {
    const reservations = await Reservation.findAll()
    console.log(reservations);
    res.json({message:reservations});
  } catch(e) {
    res.json(e);
  }
});
```
