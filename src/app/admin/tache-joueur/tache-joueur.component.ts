import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-joueur',
  templateUrl: './tache-joueur.component.html',
  styleUrls: ['./tache-joueur.component.css']
})
export class TacheJoueurComponent implements OnInit {
  rechercheJ;
  joueurs;
  personExist;
  fenetreModification;

  fenetreInscription;fenetreResultat;  fenetreSansResultat; person; isPersonExist;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllJoueur ();
  }

  

  supprimer(person): any {
    this.http
      .delete('http://localhost:8086/joueur/supprimer', person)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fenetreResultat = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllJoueur(): any {
    this.http.get('http://localhost:8086/joueur/list').subscribe({
      next: (data) => {
        this.joueurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  adhesionString(bool): string {
    if (bool === false) {
      return 'Compte adhérant';
    } else {
      return 'Compte non adhérant';
    }
  }



  inscription(person): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    this.http
      .post('http://localhost:8086/joueur/save', person)
      .subscribe({
        next: (data) => {
          alert('Création du compte Joueur');
          this.getAllJoueur();
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.fenetreInscription = false;
  }


  fenetreActivation(chiffre): any {
    this.fenetreInscription = false;
    this.fenetreResultat = false;
    this.fenetreModification = false;
    this.fenetreSansResultat = false;
    console.log('FA' + this.personExist);
    switch (chiffre) {
      case 0: {
        // rien
        break;
      }

      case 1: {
        // creation person
        this.fenetreInscription = true;
        this.personExist = false;
        this.fenetreModification = false;

        break;
      }
      case 2: {
        // Card recherche

        break;
      }
      case 3: {
        // modification du profil
        this.fenetreInscription = false;
        this.fenetreModification = true;
        this.personExist = false;
        break;
      }
      default: {
        break;
      }
    }
  }

 


  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Bloqué';
    } else {
      return 'Débloqué';
    }
  }

  cotisationBoolToStr(bool): string {
    if (bool === false) {
      return 'Adhérant';
    } else {
      return 'Non adhérant';
    }
  }

  bloquer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    console.log('bloqué');
    this.http.put('http://localhost:8086/joueur/bloquer', person).subscribe({
      next: (data) => {
        this.person = data;
        //this.getAllJoueur();
        // this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
  adherer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    console.log('bloqué');
    this.http.put('http://localhost:8086/joueur/adherer', person).subscribe({
      next: (data) => {
        this.person = data;
        //this.getAllJoueur();
        // this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  

  

  console(entreeConsole): any {
    console.log(entreeConsole);
  }


  recherchePerson(recherche): any {
    this.fenetreInscription = false;
    this.http
      .post('http://localhost:8086/joueur/recherche', recherche)
      .subscribe({
        next: (data) => {
          this.person = data;
          if (this.person != null) {
            this.fenetreResultat = true;
            this.fenetreSansResultat = false;
          } else {
            this.fenetreSansResultat = true;
            this.fenetreResultat = false;
          }
          
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  modification(personCreated): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    console.log('modif' + personCreated);
    console.log('modif va ' + personCreated.value);
    this.http
      .put('http://localhost:8086/joueur/modifier', personCreated)
      .subscribe({
        next: (data) => {
          
          alert('Modification du compte joueur');
          this.getAllJoueur();
        },
        error: (err) => {
          console.log(err);
        },
      });
    
  }

}
