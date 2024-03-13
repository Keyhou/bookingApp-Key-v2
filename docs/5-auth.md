# Auth

## Qu'est-ce qu'un token ?

Un token est une chaîne de caractères qui permet d'authentifier un utilisateur.

- [https://jwt.io/](https://jwt.io/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Auth 0](https://auth0.com/)

`$ npm install jsonwebtoken`

- Créer une route pour :
  - s'inscrire
  - se connecter
  - se déconnecter

- créer un fichier `routes/auth.js`

On a besoin du router, on doit donc implémenter le router d'express et l'exporter

```js
const express = require('express');
const router = express.Router();

// Le reste du code

module.exports = router;
```

Il faut implémenter `jsonwebtoken`.

```js
const jwt = require('jsonwebtoken');
```

Lorsque l'utilisateur va créer son compte, on ne veut pas stocker son mot de passe en clair dans la base de données, mais avoir une version hashée de son mot de passe.

On va donc installer `bcrypt` pour hasher le mot de passe.

```bash
$ npm install bcrypt
```

```js
const bcrypt = require('bcrypt');
```

## Créer les routes dans POSTMAN

- `POST /auth/signup`
- `POST /auth/signin`

## Créer la route `/signup`

Créons la route `/signup` pour créer un compte.
Comme nous voulons envoyé des données depuis le client, il faut créer une route en `POST`.

```js
router.post('/signup', (req, res) => {
  res.json({message: utilisateur créé})
})
```

Ensuite, nous devons récupérer la valeur envoyé depuis le client (POSTMAN, un formulaire, une application mobile...)

Pour récupérer l'information avec node.js, il faut utiliser `req.body`.

`req` contient toutes les informations de la requête.
`req.body` contient les informations envoyées depuis le client.

```js
const user = {
    username: req.body.username,
    password: req.body.password,
  };
```

### Hasher le mot de passe

Ça fonctionne ! Comme dit précédemment, nous voulons le mot de passe hashé et non en clair.
Pour ça nous allons utilisé bcrypt.
Comme le traitement est asynchrone, nous allons utiliser `async/await`.

```js
router.post('/signup', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    username: req.body.username,
    password: hashedPassword
  };

    res.json('Utilisateur créé');
});
```

- Nous pouvons utiliser `console.log()` ou renvoyer l'utilisateur pour voir si ça fonctionne.

Bien, maintenant, nous pouvons ajouter l'utilisateur dans la base de données.

```js
router.post('/signup', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    username: req.body.username,
    password: hashedPassword,
    // ... Autres champs nécessaires
  };

  await User.create(user);

  res..json('Utilisateur créé');
});
```

Pour que ce code fonctionne, vous devez ajouter l'implémentation de la base et le modèle correspondant.

Vérifions en base de données si l'utilisateur a bien été créé.

## Sign in

Une fois l'utilisateur créé, nous allons créer la route pour se connecter.

```js

const SECRET_KEY = 'secretkey23456'; // A remplacer par une clé secrète

router.post('/signin', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

    if (!user) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const payload = {
    username: user.username,
    // Vous pouvez ajouter d'autres propriétés ici

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({message: token});
  };

  res.json(user);
});
```

Le token qui va être généré va contenir les informations de l'utilisateur. Il est nécessaire pour accéder aux routes protégées.
Il sera valide 1h. Il faudra ensuite se reconnecter.

### Protection des routes

Pour protéger nos routes, il faut créer un middleware qui va vérifier si le token est valide.
Puis il faudra l'ajouter sur les routes que nous voulons protéger.

```js
const app = express();

const verifyJWT = (req, res, next) => {
  const  SECRET_KEY = "secretkey23456"; // A remplacer par la même clé secrète que dans la route signin
  const token = req.header('Authorization');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next(); // Si le token est valide, on passe à la suite
  } catch (e) {
    res.status(400).json({ auth: false, message: 'Invalid token.' });
  }
};
```

```js
app.use('/api', verifyJWT ,indexRouter);
```

### Se déconnecter

Pour se déconnecter, il suffit de supprimer le token côté client.

Coté serveur nous pouvons supprimer le token de la base de données, (même si ce n'est pas nécessaire).
