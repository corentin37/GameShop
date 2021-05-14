import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { JeuComponent } from './jeu/jeu.component';

const routes: Routes = [
  {component: JeuComponent, path:'jeu'},
  {component: ConnexionComponent, path:'connexion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
