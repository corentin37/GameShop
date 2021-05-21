import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-user',
  templateUrl: './tache-user.component.html',
  styleUrls: ['./tache-user.component.css']
})
export class TacheUserComponent implements OnInit {

  fenetreResultat;
  fenetreSansResultat;
  fenetreModification;
  fenetreInscription;

  users;
  person = null; // personne recherchée par requet recherche
  personExist = false;
  usersExist;
  userConnected = false;
  userId =  localStorage.getItem('id')
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getAllUser();
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
    this.getAllUser()
    this.fenetreInscription = false;
    console.log("32" + recherche);
    console.log(recherche.login);
    this.http
      .get('http://localhost:8086/user/login/' + recherche.login)
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
      .delete('http://localhost:8086/user/supprimer', person)
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

    this.http.put('http://localhost:8086/user/bloquer', person).subscribe({
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
      .post('http://localhost:8086/user/save', person)
      .subscribe({
        next: (data) => {
          alert('Création du compte user');
          this.getAllUser();
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
      .put('http://localhost:8086/user/modifier', person)
      .subscribe({
        next: (data) => {
          this.fenetreModification = false;
          
          this.getAllUser();
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
      .put('http://localhost:8086/user/modifier', personCreated)
      .subscribe({
        next: (data) => {
          this.getAllUser();
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

  getAllUser(): any {
    this.http.get('http://localhost:8086/user/').subscribe({
      next: (data) => {
        this.users = data;
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


/*
  users;
  rechercheU;
  userExist;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllUser();
  }


  getAllUser(): any {
    this.http.get('http://localhost:8086/user').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  inscriptionUser(personCreated): any{
    // le formulaire s'appelle user, mais creation de vendeur
        // ATTENTION A L'URL
    this.http.post('http://localhost:8086/user/save', personCreated).subscribe({
      next: (data) => {alert('Création du compte admin' ); },
      error : (err) => { console.log(err); }

    });
  }

  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Bloqué';
    } else {
      return 'Débloqué';
    }
  }

  rechercheUser(recherche): any {

    this.http
      .post('http://localhost:8086/user/recherche', recherche)
      .subscribe({
        next: (data) => {
          this.rechercheU = data;
          this.isUserExist();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  isUserExist(): any {
    if (this.rechercheU != null) {
      this.userExist = true;
    } else {
      this.userExist = false;
    }

    console.log(this.userExist);
  }

  bloquer(vendeur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/user/bloquer', vendeur).subscribe({
      next: (data) => {

        this.rechercheU = data;
        this.getAllUser();
        // this.ngOnInit();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /*
  rechercheUser(recherche): any {
    console.log('je suis dans la recherche du vendeur');
    this.http
      .post('http://localhost:8086/vendeur/recherche', recherche)
      .subscribe({
        next: (data) => {
          console.log('le vendeur', data);
          this.rechercheV = data;
          console.log('recherV', this.rechercheV);
          this.isVendeurExist();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
*/


