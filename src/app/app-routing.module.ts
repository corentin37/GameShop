import { TacheUserComponent } from './admin/tache-user/tache-user.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { JeuComponent } from './jeu/jeu.component';
import { CreerJoueurComponent } from './creer-joueur/creer-joueur.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { GestionSallesComponent } from './gestion-salles/gestion-salles.component';
import { TacheAdminComponent } from './admin/tache-admin/tache-admin.component';
import { TacheVendeurComponent } from './admin/tache-vendeur/tache-vendeur.component';
import { ReserverSalleComponent } from './reserver-salle/reserver-salle.component';
import { TacheSalleComponent } from './admin/tache-salle/tache-salle.component';
import { TacheJoueurComponent } from './admin/tache-joueur/tache-joueur.component';
import { PanierComponent } from './panier/panier.component';
import { HistoriqueSalleComponent } from './historique-salle/historique-salle.component';
import { TrierparPlateauComponent } from './trierpar-plateau/trierpar-plateau.component';
import { ForumComponent } from './forum/forum.component';
import { AllQuestionsLivraisonComponent } from './all-questions-livraison/all-questions-livraison.component';

import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { AjouterSalleComponent } from './ajouter-salle/ajouter-salle.component';
import { ProfilJoueurComponent } from './profil-joueur/profil-joueur.component';
import { MaMessagerieComponent } from './ma-messagerie/ma-messagerie.component';
import { ModifierCotisationComponent } from './modifier-cotisation/modifier-cotisation.component';
import { SupprimerSalleComponent } from './supprimer-salle/supprimer-salle.component';
import { GestionAdminComponent } from './gestion-admin/gestion-admin.component';



const routes: Routes = [
  {component: JeuComponent, path: 'jeu'},
  {component: ConnexionComponent, path: 'connexion'},
  {component: DeconnexionComponent, path: 'deconnexion'},
  {component: CreerJoueurComponent, path: 'creerJoueur'},
  {component: AdminComponent, path: 'admin', children: [
    {component: TacheAdminComponent, path: 'tache-admin'},
    {component: TacheSalleComponent, path: 'tache-salle'},
    {component: TacheJoueurComponent, path: 'tache-joueur' },
    {component: TacheUserComponent, path: 'tache-user'},
    {component: TacheVendeurComponent, path: 'tache-vendeur' },
  ]},
  {component: CatalogueComponent, path: 'catalogue'},
  {component: GestionSallesComponent, path: 'salle'},
  {component: ReserverSalleComponent, path: 'reserverSalle'},
  {component: HistoriqueSalleComponent, path: 'historiqueSalle'},
  {component: AjouterSalleComponent, path:'ajouterSalle'},
  {component: ModifierCotisationComponent, path:'modifierCotisation'},
  {component: SupprimerSalleComponent, path: 'supprimerSalle'},
  {component: TrierparPlateauComponent, path: 'trierParPlateau'},
  {component: PanierComponent, path: 'panier'},
  {component: MaMessagerieComponent, path: 'messagerie'},
  {path: '', redirectTo: 'catalogue', pathMatch: 'full'}, // quand il ya pas de chemin ça redirige directement vers le catalogue
  
  {component: TacheVendeurComponent, path: 'admin-tacheVendeur' },
  {component: TacheSalleComponent, path: 'admin-tacheSalle'},
  {component: TacheJoueurComponent, path: 'admin-tacheJoueur' },
  {component: TacheUserComponent, path: 'admin-tacheUser'},
  {component: ForumComponent, path: 'forum'},
  {component: AllQuestionsLivraisonComponent, path: 'questionLivraison'},
  {component: ProfilJoueurComponent, path:'profil'},
/*
  {component: AdminComponent, path: 'admin', children: [
    
    
    {component: TacheAdminComponent, path: 'tacheAdmin'},
    {component: TacheSalleComponent, path: 'tacheSalle'},
    {component: TacheJoueurComponent, path: 'tacheJoueur' },
    {component: TacheUserComponent, path: 'tacheUser'},
]    },

*/
  {path: '', redirectTo: 'catalogue', pathMatch: 'full'}// quand il ya pas de chemin ça redirige directement vers le catalogue
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
