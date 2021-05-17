import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { JeuComponent } from './jeu/jeu.component';
import { CreerJoueurComponent } from './creer-joueur/creer-joueur.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { NewAvisComponent } from './new-avis/new-avis.component';

const routes: Routes = [
  {component: JeuComponent, path: 'jeu'},
  {component: ConnexionComponent, path: 'connexion'},
  {component: CreerJoueurComponent, path: 'creerJoueur'},
  {component: AdminComponent, path: 'admin'},
  {component: CatalogueComponent, path: 'catalogue'},
  {component: NewAvisComponent, path: 'avis'},
  {path:'',redirectTo:'catalogue',pathMatch:'full'}//quand il ya pas de chemin ça redirige directement vers le catalogue

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
