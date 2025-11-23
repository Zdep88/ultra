# CDCF

## Résumé

Faire un dashboard qui permet de :

1. gérer les bdd
2. créer un nouveau site/sous-domaine
3. créer de nouvelles routes API
4. afficher la liste des liens et requetes

quand on crée un user, on précise si c'est un ADMIN (bool)
quand on crée une requête, on précise si elle est publique (bool). Si privée, seulement les ADMIN et les users listés dans la whitelist de la requête peuvent y accéder

bdd :

- user role:ADMIN (ex: Nico) : accès à toutes les requêtes, accès au dashboard, distribuer les domaines aux clients
- user role:USER (ex: Tibo) : permettre la mise à jour d'un sous-domaine

## Tables

- USER [__id__, username, password] (id = 1 => ADMIN)
- DOMAIN [name, address, owner->USER]
- REQUEST [url, (base_url ?), method, queryparams, controller/script, is_public]
- REQUEST_USER [request->REQUEST, user->USER]

## User stories

- VISITOR : se connecter, accéder aux liens et requetes publiques
- USER : se déconnecter, changer son mdp, mettre à jour ses domaines (en lot aussi, éventuellement), accéder aux liens et requetes publiques, accéder aux requetes privées auquelles il a droit, supprimer ses propres domaines, supprimer son compte (supprimera aussi ses propres domaines)
- ADMIN : tous les droits de USER, créer un USER avec son mdp, supprimer un USER, créer un domaine (en attribuant l'owner), modifier un domaine, supprimer un domaine, créer des requetes, ouvrir des requetes à des utilisateurs
