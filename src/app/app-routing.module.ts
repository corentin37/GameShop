import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeuComponent } from './jeu/jeu.component';

const routes: Routes = [
  {component: JeuComponent, path:'jeu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
