# Implementer les routes

## Dossier routes

Le dossier `routes` contient les deux fichiers de routes.

les accès sont implémentés dans le fichier `app.js`

```js
var indexRouter = require(‘./routes/index’);
var usersRouter = require(‘./routes/users’);
```

Cela permet d’importer les fichiers `index.js` et `users.js` et de stocker la valeur exportée dans une variable.
La fonction `require()` utilise le chemin local du fichier, sans l’extension `.js`.

```js
app.use(‘/‘, indexRouter);
app.use(‘/users’, usersRouter);
```

La méthode `.use()` associe ici le chemin `/` ou `/users` a notre variable.
Cela veut dire :

- Lorsque l’utilisateur se rend sur l’adresse `localhost:3000/`, il reçoit la fonction associée du fichier `index.js`
- Lorsque l’utilisateur se rend sur l’adresse `localhost:3000/users`, il reçoit la fonction associée du fichier `users.js`

### index.js

Dans ce fichier nous pouvons additionner les chemins. Ici c’est un cas particulier car notre fichier commence par `/`.

```js
var express = require(‘express’);
var router = express.Router();

/* GET home page. */
router.get(‘/‘, function(req, res, next) {
  res.json({ title: ‘Express’ });
});

module.exports = router;

```

## Explication de code

La premiere ligne indique que j’importe et stocke dans une variable la dépendance `express`.
La deuxième ligne indique que j’implémente la méthode `Router()` sur la variable `express`.

La variable `router` est donc l’implanter d’une méthode sur la dépendance `express`.
Cela permet de faire des requêtes et réponses.

## Requête et reponse

### Requête

La requête correspond à ce que le client, c’est a dire le navigateur de votre ordinateur, envoie au serveur.
Vous allez indiqué par exemple les informations suivantes :
- Le protocole (http)
- Le host (localhost)
- Le port (3000)
- La route (/)

Parfois, nous indiquons d’autres informations comme :

- des paramètres de connexion (email et mot de passe)
- Du contenu (une description, un article…)
- Un fichier

En plus, il y a le header, c’est a dire les elements relatifs a la requête, le body :

- Votre appareil de connexion (MacBook pro, iPhone…)
- Votre OS (Mac OS 11.1…)
- Votre navigateur (Firefox 49.1)
- Une clé d’authorization
- Le type de fichier envoyé (html, css, js…)

### Reponse

La réponse, c’est l’envoie du serveur au client.
Un peu comme une requête en sens inverse.
Le serveur répond a la requête.
Il renvoie un body et un header.

### MÉTHODE HTTP

Il y a également deux elements importants, le premier étant la méthode HTTP.

Il y a principalement :

- `GET` : pour RECEVOIR une information
- `POST` : pour ENVOYER une information
- `PUT` : pour MODIFIER une information
- `DELETE` : pour SUPPRIMER une information

### Code HTTP

Il y a également les codes HTTP, reparties de la manière suivante :

- 2XX : Succès de requête
- 3XX : Redirection (temporaire ou permanente)
- 4XX : Problème coté client
- 5XX : Problème cote serveur

### Express

Par default express renvoie une code HTTP 200, ce qui veut dire que tout se passe bien.

Dans notre code de tout a l’heure

```js
router.get(‘/‘, function(req, res, next) {
  res.json({ title: ‘Express’ });
});
```

Nous voyons que :

- La route est / additionnée a celle de app.js, soit //, qui correspond a localhost:3000/ ou localhost:3000 (sans le slash de fin)
- la méthode HTTP est GET (`.get()`)
- La méthode `get` prend deux paramètre, le chemin de la route, ici `/` et une méthode de callback, qui est exécuté lorsque le client envoie une requête a cette addresse.
- La `function()` récupère trois paramètres, la requête `req`, la réponse `res` et un paramètre `nexts pour appeler la fonction suivante.
- Nous appliquions la méthode `json()` a notre réponse. Cette méthode ajoute le bon header pour dire que nous envoyons du json.
- Le contenu de la réponse est `title: “Express”1er

## Export

Nous exportons notre code grace a : 

```js
module.exports = router;
```

C’est comme ca que nous indiquons ce que nous exportons au fichier qui va importer ce code (app.js).

Pour la gestion des restaurants, nous allons ajouter dans le dossier routes les fichiers suivants :

- reservations.js
- spots.js
- rooms.js