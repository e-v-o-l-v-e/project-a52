# Projet-A52

## Techno

[Kaplay](https://kaplayjs.com)

## Développement

```sh
npm install
npm run dev
```
### Folder structure

- `src` - source code for your kaplay project
- `dist` - distribution folder, contains your index.html, built js bundle and static assets

### Run

```sh
$ npm run dev
```

will start a dev server at http://localhost:8000

### Distribution

```sh
$ npm run build
```

will build your js files into `dist/`

```sh
$ npm run zip
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.⏎

## Etapes

### Etape 1

- grille carrée sur laquelle on peut se déplacer
- host sur gitlab pages et envoyer le lien

## Questions

- taille des carrés 
    - tant qu'on peut voir la grille
- deplacement à la sourie ou au clavier ?
    - souris clic gauche, clavier si ça marche bien
    - juste la souris suffit normalement (principalement)
- systeme de coordonnée ?
    - bonne question
    - faudrait que ce soit possible
- quelles informations afficher sur le HUD
    - une barre en haut ou sur le coté, avec notamment le score
- est-ce qu'il faut passer de case en case ou d'element en element
    - les elements seront proches
    - mettre les coordonées modifiable facilement
- multi/solo (a priori solo vu que gitlab pages c'est static)
    - solo
- contraintes en terme de droit
    - nope c'est chill
- doit etre jouable sur mobile ?
    - non
- spec de l'ordi ? responsive
    - pas responsive
- multilingue
    - oui : gaultier
- accessibilité
    - contrast daltonien
- quelle techno vous voulez qu'on utilise
    - ?
- theme visuel ?
    - non
    - rester simple et focus sur les fonctionnalités
- histoire ?
    - non sauf si on en trouve une
- son ?
    - oui si on peut
- pourquoi vous etes chauve ?
    - parce que la genetique, facteur premier
- peut on zoomer ?
    - oui


pss atres precis sur ce qu'il y a dedans les case

quand on explique un choix un truc qui joue c'est ce qu'on connait
si on connait on peut bossre plus vite et mieux sans formation
mais aussi ça reste juste confort
raison bonne mais presentée différents : adapté à ce que le client veut : simple = techno que l'équipe maitrise
on part du besoin :
- on y a pensé mais voila pourquoi c'est chiant
- montrer plusieurs trucs pour montrer qu'on a vraiment étudié la question, cherché le truc qui feat le mieux avec le client
