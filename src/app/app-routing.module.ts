import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { JeuComponent } from './jeu/jeu.component';
import { CreerJoueurComponent } from './creer-joueur/creer-joueur.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
<<<<<<< HEAD
import { PanierComponent } from './panier/panier.component';
=======
import { TacheAdminComponent } from './admin/tache-admin/tache-admin.component';
import { TacheVendeurComponent } from './admin/tache-vendeur/tache-vendeur.component';
>>>>>>> 44700078ab99512cf9fde6faf9d6b7dd86bd025b

const routes: Routes = [
  {component: JeuComponent, path: 'jeu'},
  {component: ConnexionComponent, path: 'connexion'},
  {component: CreerJoueurComponent, path: 'creerJoueur'},
  {component: AdminComponent, path: 'admin'},
  {component: CatalogueComponent, path: 'catalogue'},
<<<<<<< HEAD
  {component: PanierComponent, path: 'panier'},
  {path:'',redirectTo:'catalogue',pathMatch:'full'}//quand il ya pas de chemin ça redirige directement vers le catalogue
=======
  {component: TacheAdminComponent, path: 'admin/tacheAdmin'},
  {component: TacheVendeurComponent, path: 'admin/tachevendeur' },
  {path: '', redirectTo: 'catalogue', pathMatch: 'full'}// quand il ya pas de chemin ça redirige directement vers le catalogue

>>>>>>> 44700078ab99512cf9fde6faf9d6b7dd86bd025b

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
