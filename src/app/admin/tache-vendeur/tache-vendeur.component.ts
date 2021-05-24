import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-vendeur',
  templateUrl: './tache-vendeur.component.html',
  styleUrls: ['./tache-vendeur.component.css'],
})
export class TacheVendeurComponent implements OnInit {
  rechercheV;
  vendeurs;
  personExist = false;
  vendeurExist = false;

  /* cc admin */
  fenetreInscription;
  fenetreResultat;
  fenetreModification;
  fenetreSansResultat;
  userConnected = false;
  userId =  localStorage.getItem('id')
  person;
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getAllVendeur();
    this.fenetreActivation(1);
  }

  connected(){
    if (this.userId != null){
      return this.userConnected = true;
    } else{
      return this.userConnected = false;
    }

  }

  addVendeur(vendeur): any {
    if (vendeur != null) {
      return vendeur;
    } else {
      return 'Pas de vendeur';
    }
  }

  getAllVendeur(): any {
    this.http.get('http://localhost:8086/vendeur/list').subscribe({
      next: (data) => {
        this.vendeurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /*------------ tache admin CC------*/
  recherchePerson(recherche): any {
    this.getAllVendeur();
    this.fenetreInscription = false;
    this.http
      .post('http://localhost:8086/vendeur/recherche', recherche)
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



  fenetreActivation(chiffre): any {
    this.fenetreInscription = false;
    this.fenetreResultat = false;
    this.fenetreModification = false;
    this.fenetreSansResultat = false;

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



  bloquer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE

    this.http.put('http://localhost:8086/vendeur/bloquer', person).subscribe({
      next: (data) => {
        this.person = data;
        this.getAllVendeur();
        // this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  inscription(person): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    this.http.post('http://localhost:8086/vendeur/save', person).subscribe({
      next: (data) => {
        alert('Création du compte vendeur');
        this.getAllVendeur();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.fenetreInscription = false;
  }

  effacer(person): any {
    // effacer le user mais

    person.id;
    person.login = person.id;
    person.password = null;
    person.mail = null;
    person.tel = null;
    person.activity = false;

    this.http.put('http://localhost:8086/vendeur/modifier', person).subscribe({
      next: (data) => {
        this.fenetreModification = false;

        this.getAllVendeur();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  modification(personCreated): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL


    this.http
      .put('http://localhost:8086/vendeur/modifier', personCreated)
      .subscribe({
        next: (data) => {
          this.getAllVendeur();
          this.fenetreModification = false;
          this.fenetreResultat = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  entreeConsole;
  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Bloqué';
    } else {
      return 'Débloqué';
    }
  }
}
