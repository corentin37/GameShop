import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeuComponent } from './jeu/jeu.component';

import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreerJoueurComponent } from './creer-joueur/creer-joueur.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { GestionSallesComponent } from './gestion-salles/gestion-salles.component';

import { NewAvisComponent } from './new-avis/new-avis.component';

import { TacheAdminComponent } from './admin/tache-admin/tache-admin.component';
import { TacheVendeurComponent } from './admin/tache-vendeur/tache-vendeur.component';
import { TacheSalleComponent } from './admin/tache-salle/tache-salle.component';
import { TacheUserComponent } from './admin/tache-user/tache-user.component';
import { TacheJoueurComponent } from './admin/tache-joueur/tache-joueur.component';









@NgModule({
  declarations: [
    AppComponent,
    JeuComponent,
    ConnexionComponent,
    CreerJoueurComponent,
    AdminComponent,
    CatalogueComponent,
    GestionSallesComponent,

    NewAvisComponent,

    TacheAdminComponent,
    TacheVendeurComponent,
    TacheSalleComponent,
    TacheUserComponent,
    TacheJoueurComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
