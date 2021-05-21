import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { DepService } from '../../Services/dep.service';

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
  userConnected = false;
  userId =  localStorage.getItem('id')
  fenetreResultat;
  fenetreSansResultat;
  fenetreModification;
  fenetreInscription;

  constructor(private http: HttpClient, private route: Router, private deployService: DepService) {}

  ngOnInit(): void {
    this.getAllAdmin();
    this.fenetreActivation(1)
  }

  connected(){
    if (this.userId != null){
      return this.userConnected = true;
    } else{
      return this.userConnected = false;
    }

  }

  recherchePerson(recherche): any {
    this.getAllAdmin()
    this.fenetreInscription = false;
    this.http
      .post(this.deployService.lienHttp + 'admin/recherche', recherche)
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
      .delete(this.deployService.lienHttp + 'admin/supprimer', person)
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

    this.http.put(this.deployService.lienHttp + 'admin/bloquer', person).subscribe({
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
    console.log(person);
    this.http
      .post(this.deployService.lienHttp + 'admin/save', person)
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

  effacer(person): any { // effacer le user mais

    
    person.id;
    person.login =  person.id;
    person.password = null;
    person.mail = null;
    person.tel= null;
    person.activity= false;
    

    this.http
      .put(this.deployService.lienHttp + 'admin/modifier', person)
      .subscribe({
        next: (data) => {
          this.fenetreModification = false;
          
          this.getAllAdmin();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  modification(personCreated): any {

    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL

    console.log("console modif")
    this.http
      .put(this.deployService.lienHttp + 'admin/modifier', personCreated)
      .subscribe({
        next: (data) => {
          this.getAllAdmin();
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

  getAllAdmin(): any {
    this.http.get(this.deployService.lienHttp + 'admin/list').subscribe({
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
