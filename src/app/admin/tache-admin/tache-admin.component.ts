import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-admin',
  templateUrl: './tache-admin.component.html',
  styleUrls: ['./tache-admin.component.css'],
})
export class TacheAdminComponent implements OnInit {
  admins;
  person = null; // personne recherchée par requet recherche
  personExist = false;
  adminsExist;

  // creation fenetre

  fenetreResultat;
  fenetreSansResultat;
  fenetreModification;
  fenetreInscription;

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getAllAdmin();
  }

  recherchePerson(recherche): any {
    this.fenetreInscription = false;
    this.http
      .post('http://localhost:8086/admin/recherche', recherche)
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

  supprimer(person): any {
    this.http
      .delete('http://localhost:8086/admin/supprimer', person)
      .subscribe({
        next: (data) => {
          
          this.fenetreResultat = false;
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

  

  refreshAdmins(): any {
    if (this.person == null) {
      this.getAllAdmin();
    } else {
    }
  }

  bloquer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    
    this.http.put('http://localhost:8086/admin/bloquer', person).subscribe({
      next: (data) => {
        this.person = data;
        //this.getAllAdmin();
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
    this.http
      .post('http://localhost:8086/admin/save', person)
      .subscribe({
        next: (data) => {
          alert('Création du compte admin');
          this.getAllAdmin();
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.fenetreInscription = false;
  }

  modification(personCreated): any {
    
    
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    console.log('modif' + personCreated);
    console.log('modif value ' + personCreated.value);
    this.http
      .put('http://localhost:8086/admin/modifier', personCreated)
      .subscribe({
        next: (data) => {
          
          alert('Modification du compte admin');
          this.getAllAdmin();
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

  getAllAdmin(): any {
    this.http.get('http://localhost:8086/admin/list').subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Bloqué';
    } else {
      return 'Débloqué';
    }
  }
}
