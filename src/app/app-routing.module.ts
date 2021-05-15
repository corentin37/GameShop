import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { JeuComponent } from './jeu/jeu.component';
import { CreerJoueurComponent } from './creer-joueur/creer-joueur.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {component: JeuComponent, path:'jeu'},
  {component: ConnexionComponent, path:'connexion'},
  {component: CreerJoueurComponent, path:'creerJoueur'},
  {component: AdminComponent, path:'admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
