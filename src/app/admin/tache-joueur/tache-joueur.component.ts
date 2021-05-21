import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DepService } from '../../Services/dep.service';

@Component({
  selector: 'app-tache-joueur',
  templateUrl: './tache-joueur.component.html',
  styleUrls: ['./tache-joueur.component.css']
})
export class TacheJoueurComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router, private deployService: DepService) { }
  rechercheJ;
  joueurs;
  personExist;
  fenetreModification;

  fenetreInscription; fenetreResultat;  fenetreSansResultat; person; isPersonExist;
  userConnected = false;
  userId =  localStorage.getItem('id')
  entreeConsole;

  ngOnInit(): void {
    this.getAllJoueur ();
    this.fenetreActivation(1);
  }

  connected(){
    if (this.userId != null){
      return this.userConnected = true;
    } else{
      return this.userConnected = false;
    }

  }


  getAllJoueur(): any {
    this.http.get(this.deployService.lienHttp + 'joueur/list').subscribe({
      next: (data) => {
        this.joueurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  cotisationBoolToStr(bool): string {
    if (bool === false) {
      return 'Adhérent';
    } else {
      return 'Non adhérent';
    }
  }




  adherer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    console.log('bloqué');
    this.http.put(this.deployService.lienHttp + 'joueur/adherer', person).subscribe({
      next: (data) => {
        this.person = data;
        this.getAllJoueur();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  recherchePerson(recherche): any {
    this.getAllJoueur();
    this.fenetreInscription = false;
    this.http
      .post(this.deployService.lienHttp + 'joueur/recherche', recherche)
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
      .delete(this.deployService.lienHttp + 'joueur/supprimer', person)
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


  bloquer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE

    this.http.put(this.deployService.lienHttp + 'joueur/bloquer', person).subscribe({
      next: (data) => {
        this.person = data;
        this.getAllJoueur();

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
      .post(this.deployService.lienHttp + 'joueur/save', person)
      .subscribe({
        next: (data) => {
          alert('Création du compte joueur');
          this.getAllJoueur();
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
    person.tel = null;
    person.activity = false;


    this.http
      .put(this.deployService.lienHttp + 'admin/modifier', person)
      .subscribe({
        next: (data) => {
          this.fenetreModification = false;
          this.getAllJoueur();
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
      .put(this.deployService.lienHttp + 'admin/modifier', personCreated)
      .subscribe({
        next: (data) => {
          this.getAllJoueur();
          this.fenetreModification = false;
          this.fenetreResultat = true;
        },
        error: (err) => {
          console.log(err);
        },
      });

  }
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
