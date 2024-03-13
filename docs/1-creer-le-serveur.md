# Comment créer un serveur Node.js ?

Node.js est un outils.

Express est un framework minimaliste qui permet de faire un serveur “plus facilement”.
> ⚠️ Epress est aujourd’hui considéré comme vieux car non mis a jour. 
Il est plus recommandé d’utiliser fastify ou Adonis/Nest/Api.

```
npm install express-generator
```

```
npx express no—-view myapp
```

Remplacer myapp par votre nom de dossier.

Cette commande va installer les dossiers et fichiers nécessaires express.
Nous voulons utiliser express comme une API, nous lui demandons donc de ne pas installer de vue avec le paramètre `no-view`.

Avant de continuer, vous pouvez faire la commande suivantes pour installer les dépendances.

```bash
cd myapp # Optionnel, si besoin
npm i # équivalent a npm install
npm run start #pour lancer le serveur
```

Vous devriez avoir les dossiers et fichiers suivants :

```bash
-myapp
——bin
——————www
——node_modules
——public
——————images
——————javascripts
——————stylesheets
——————Index.html
——routes
——————index.js
——————users.js
——app.js
——package.json
——package-lock.json
```

Voici a quoi corrrespondent ces fichiers et dossiers :

- bin : contient le fichier relatifs au serveur, www. Cela permet de lancer le serveur (host, port, erreurs…)
- node modules : Fichiers des modules externes. C’est ici qu’est le code d’Express.
- public : fichiers statiques qui ne seront pas exécuter par le serveur. Par exemple les images, css, html… Nous allons tout supprimer a l’intérieur.
- routes : Contients les routes (c’est a dires chemins de nôtres applications et leur actions.
- app.js : Fichier principal, relatif a la gestion de notre serveur.
- package-lock.json : Fichiers automatiquement généré. Ne pas toucher mais il faut le versionner. Permet de s’assurer des bonnes versions de des dépendances l’application.
- package.json : Fichier de configuration, contient les dépendances et d’autres elements.

## Supprimer la partie vue

### Le dossier Public 

Supprimer les dossiers et fichiers suivants, dans le repertoire public : 

- images
- javaScript
- stylesheets
- index.html 

### Les routes

#### index.js

Remplacer 

```js
// index.js
  res.render(‘index’, { title: ‘Express’ });
```

Par

```js
// index.js
  res.json({hello: ‘World’ });
```

#### users.js

```js
// users.js
  res.send(‘respond with a resource’);
```

```js
// users.js
  res.json({file: user});
```

## Vérifier le serveur

Relancer votre serveur puis aller sur localhost:3000`.

Vous devriez voir :

`{“title”:”Express”}`

## Bonus

Si vous avez nodes 18+, vous pouvez ajouter ceci

Dans package.json, modifier

```json
“scripts”: {
  “start”: “node ./bin/www”
},
```

Par

```json
“scripts”: {
  “start”: “node —-watch ./bin/www”
},
``` 

Cela permet de relancer votre serveur a chaque modification (lorsque vous enregistré).

Sinon, vous pouvez installer nodemon.