import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TacheAdminComponent } from './admin/tache-admin/tache-admin.component';
import { TacheVendeurComponent } from './admin/tache-vendeur/tache-vendeur.component';
import { TacheSalleComponent } from './admin/tache-salle/tache-salle.component';
import { TacheUserComponent } from './admin/tache-user/tache-user.component';
import { TacheJoueurComponent } from './admin/tache-joueur/tache-joueur.component';
import { ReserverSalleComponent } from './reserver-salle/reserver-salle.component';
import { HistoriqueSalleComponent } from './historique-salle/historique-salle.component';
import { PanierComponent } from './panier/panier.component';
import { TrierparPlateauComponent } from './trierpar-plateau/trierpar-plateau.component';
import { ForumComponent } from './forum/forum.component';
import { AllQuestionsLivraisonComponent } from './all-questions-livraison/all-questions-livraison.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { AjouterSalleComponent } from './ajouter-salle/ajouter-salle.component';
import { ProfilJoueurComponent } from './profil-joueur/profil-joueur.component';
import { ModifierCotisationComponent } from './modifier-cotisation/modifier-cotisation.component';
import { SupprimerSalleComponent } from './supprimer-salle/supprimer-salle.component';
import { MaMessagerieComponent } from './ma-messagerie/ma-messagerie.component';



@NgModule({
  declarations: [
    AppComponent,
    JeuComponent,
    ConnexionComponent,
    CreerJoueurComponent,
    AdminComponent,
    CatalogueComponent,
    GestionSallesComponent,
    PanierComponent,
    TacheAdminComponent,
    TacheVendeurComponent,
    TacheSalleComponent,
    TacheUserComponent,
    TacheJoueurComponent,
    ReserverSalleComponent,
    HistoriqueSalleComponent,
    TrierparPlateauComponent,
    DeconnexionComponent,
    AjouterSalleComponent,
    ForumComponent,
    AllQuestionsLivraisonComponent,
    ProfilJoueurComponent,
    MaMessagerieComponent,
    ModifierCotisationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
