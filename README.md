# Babel_Fish Coco
## Deployer l'aplication

### Etape 1: Lancer le server 
Se rendre dans le dossier server-trad via la console 
taper les commandes suivantes dans l'ordre :
- npm install
- npm start 

Le serveur tourne sur votre machine et il écoute sur le port 3000


Il vous faut récupérer votre adresse IP privée, rendez vous dans le dossier de l'application et ajouter votre adresse IP privée au champs vide "Votre IP" dans le fichier src/services/service.translate.ts

### Etape intermédiare
installer ionic en global 

npm install ionic -g

### Etape 2 
installer la plateforme android dans le dossier de l'application avec la commande

ionic cordova add platform android

### Etape 3
installer les plugins nécessaires à l'application via la commande

ionic state reset

### Etape 4
taper la commande 

npm install

### Etape 5 
Lancer l'application :
brancher votre telephone à l'ordinateur en mode développeur

taper la commande 

ionic cordova run android