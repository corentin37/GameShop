import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ma-messagerie',
  templateUrl: './ma-messagerie.component.html',
  styleUrls: ['./ma-messagerie.component.css']
})
export class MaMessagerieComponent implements OnInit {

// creation fenetre

fenetreResultat;
fenetreSansResultat;
fenetreModification;
fenetreEcrire;

messages;
message = null; // personne recherchée par requet recherche
messageExist = false;
messagesExist;

destinataireExist;

userId =  localStorage.getItem('id')



  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    
    console.log(this.userId);
    this.getAllMesMessages();
  }

  rechercheMesMessages(recherche): any {
    // recherche: id
    this.fenetreEcrire = false;
    this.http
      .get('messages/recherche/id' + recherche)
      .subscribe({
        next: (data) => {
          this.message = data;
          if (this.message != null) {
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
  
  rechercheMesMessagesId(recherche): any {
    // recherche: id
    this.fenetreEcrire = false;
    console.log(recherche);
    this.http
      .get('http://localhost:8086/messages/recherche/' + recherche)
      .subscribe({
        next: (data) => {
          this.message = data;
          if (this.message != null) {
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

  supprimer(message): any {
    this.http
      .delete('http://localhost:8086/admin/supprimer', message)
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
    this.fenetreEcrire = false;
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
        this.fenetreEcrire = true;
        this.messageExist = false;
        this.fenetreModification = false;

        break;
      }
      case 2: {
        // Card recherche

        break;
      }
      case 3: {
        // modification du profil
        this.fenetreEcrire = false;
        this.fenetreModification = true;
        this.messageExist = false;
        break;
      }
      default: {
        break;
      }
    }
  }




  /*
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
  }*/

  trouverDestinataire(login): any {

    this.http
    .get('http://localhost:8086/user/login/' + login).subscribe({
    next: (data) => { this.destinataireExist = data; console.log("trouver" + data)
    },
    error: (err) => {
      console.log(err);
    },
  });
  }

  ecrire(message): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    console.log("ecrire msg" + message.value);
    console.log("ecrire msg" + this.userId);
    message.expediteur = this.userId;
    console.log("ecrire msg" + message.value);

    this.http
      .post('http://localhost:8086/messages/save', message)
      .subscribe({
        next: (data) => {
          alert('Message envoyé');
          this.getAllMesMessages();
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.fenetreEcrire = false;
  }

/*
  effacer(person): any { // effacer le user mais

    
    person.id;
    person.login =  person.id;
    person.password = null;
    person.mail = null;
    person.tel= null;
    person.activity= false;
    

    this.http
      .put('http://localhost:8086/admin/modifier', person)
      .subscribe({
        next: (data) => {
          this.fenetreModification = false;
          
          this.getAllAdmin();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }*/

/*
  modification(personCreated): any {

    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL

    console.log("console modif")
    this.http
      .put('http://localhost:8086/admin/modifier', personCreated)
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

  }*/

  entreeConsole;
  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  getAllMesMessages(): any {
    this.http.get('http://localhost:8086/messagerie/' + this.userId).subscribe({
      next: (data) => {
        this.messages = data;
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
