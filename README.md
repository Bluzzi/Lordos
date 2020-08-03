## LORDOS

### A faire
- [ ] Changer le parametre alias des commandes, faire en sorte qu'il prenne une array d'alias.
- [ ] Ajouter le paramtre "category" dans le constructeur des commandes, pour pouvoir mieux les classés.
- [ ] Diviser les commandes dans plusieurs dossier nommé par type de catégorie et faire un auto loader effiace pour ce systeme.

### Commandes
#### Configuration :
- [ ] prefix -> changer le prefix des commandes pour ce serveur

#### Utils :
- [x] annonce (votre annonce) -> envoie votre annonce dans un embed 
- [x] emojiannnonce (votre annonce) -> envoie votre annonce en emoji
- [x] avatar (mention, par default : vous) -> envoie l'avatar de la personne dans un embed
- [x] calcul (votre calcul) -> calculer une opération
- [ ] translate (lang) (phrase) -> traduit une phrase
- [ ] encode (base64, binaire) (phrase) -> encode une phrase
- [ ] hash (sha256, md5) (phrase) -> hash une phrase
- [ ] invite -> ???? (invite manager)
- [ ] heure (zone géographique) -> obtenir l'heure
- [ ] giveway -> ????
- [x] dice (nombre de dès à lancé) -> lance un certain nombre de dès et vous affiche leur resultats
- [x] eval (votre code) -> execute votre code
- [x] parsecheatcode -> obtenir des adresse mémoire Nintendo
- [x] ping (adresse IP) -> voir la latence entre le bot et une adresse IP
- [x] test -> effectué un test ¯\\_(ツ)_/¯
- [x] url -> permet de sauvegarder une liste de lien util pour le serveur
- [x] weather -> voir la météo d'une zone géographique

#### Modérations :
- [ ] clear (nombre, par default : 10) -> permet de clear les messages du salon
- [ ] mute
- [ ] warn
- [ ] ban
- [ ] kick 
- [ ] unban
- [ ] rename (user mention) (new name)
- [x] votemute (mention) -> voté pour mute une des personne dans le vocal, il sera mute pendant 5 minutes si il y a plus de la moitier des votes

#### Musique :
- [ ] play (titre, lien youtube ou spotify) -> permert de jouer une musique dans le salon vocal
- [ ] stop -> stop la musique dans votre salon
- [ ] nowplaying -> voir le titre, le lien et le temps restant de la musique en cours
- [ ] skip -> passé à la musique suivante
- [ ] queue -> voir la liste des musique qui vont être joué
- [x] horn -> joue un son de horn dans votre salon

#### Fun :
- [ ] gif (list de mot clé) -> envoie un gif via l'api de https://giphy.com/
- [ ] foodporn -> envoie des images de bouffe qui donne envie
- [x] choice (mot 1) (mot 2) ...(mot) -> le bot choisi un mot aléatoirement
- [x] choicenumber (votre nombre) -> choisir un nombre
- [x] mynumbers -> voir votre nombre choisi
- [x] numbers -> voir la liste des nombres choisi par les personnes de ce serveur
- [x] randomnumber (min) (max) -> envoie un nombre aléatoire entre le minimum et le maximum 
- [x] countdown (nombre) -> affiche un compteur qui part de votre nombre jusqu'a 0 en emoji
- [x] digit (un nombre) -> vous affiche un nombre sous forme d'emoji
- [x] 8ball (votre question) -> répond à votre question par oui, non ou peut-être
- [x] worldreact (id du message) (lettres) -> ajoute des lettre en reaction au message souhaité

#### Information :
- [x] help (nom de la commande, par default : vide) : voir les commandes existantes
- [x] commandcount -> voir le nombre de commande ainsi que l'objectif à atteindre
- [ ] lordos/bot -> obtenir des informations sur le bot, ses développeurs ainsi que les liens utiles
- [ ] covidinfo -> obtenir des informations sur le covid via cette API : https://blog.shevarezo.fr/post/2020/03/25/recuperer-statistiques-coronavirus-covid-19-ligne-de-commande-cli
- [x] info (mention, par default : vous) -> obtenir des informations sur un utilisateur
- [x] serverinfo -> obtenir des informations sur le serveur
- [x] minecraftquery (serveur ip) (port, par default : 19132) -> obtenir des informations sur un serveur Minecraft
- [x] wikirandom -> vous envoie une page aléatoire de wikipédia

#### Jeux :
- [ ] shifumi (pierre, feuille ou ciseaux) -> lancé une partie de shifumi contre le bot
- [ ] findnumber (min ou "stop") (max) -> trouver le nombre entre le minimum et le maximum, tout le salon peux joué dans le salon et des que le nombre est trouver le jeu s'arreter en annoncant le vainqueur
- [x] mastermind -> joué au mastermind (il faut trouver un code couleur)
- [x] precision -> vous donne une série de trois mots dans le salon, vous avez 15 secondes pour les écrire, le premier qui a fini gagne
- [x] puissance4 -> jouer au puissance 4 avec un autre joueur
- [x] tictactoe -> jouer au tic tac toe avec un autre joueur

#### Générateur de meme :
- [ ] bon toutou (pseudo) (couleurs) -> un meme bon toutou avec le pseudo de la personne
- [ ] achivement (phrase) -> la banniere achivement de Minecraft avec la phrase voulu
- [ ] compability (mention) (mention, par default : vous) -> créé une image avec les photos de profil des deux personnes séparé par un pourcentage d'amour et une image selon ce pourcentage
- [ ] trigerred (mention, par default : vous) -> envoie votre photo de profil en mode trigerred

#### Classement :
- [ ] level -> voir son level (il évolue quand on envoie un message)
- [ ] toplevel -> voir le classement des levels

> help : ranger les commandes via leur catégories
> precision : fix le fait de pouvoir édité les messages
> url : adapté aux multi serveur
> eval : ne pas définir de permission mais donner la possibilité de l'utilisé que aux développeurs du bot
> calul : trouver des failles, amélioré le systeme
> countdown : ne fonctionne pas
> choicenumber : l'adapter au multi serveur
> dice : ajouter le total de tout les dès lancé
> minecraftquery : ajouter le support des serveurs Java
> parsecheatcode : changer le nom de la commande
> votemute : unmute la personne automatiquement après 5 minutes