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

destinataire;
destinataireExist;

userId =  localStorage.getItem('id')
userLogin =  localStorage.getItem('login')



  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    
    console.log(this.userId);
    
    this.getAllMesMessages();
    this.fenetreActivation(1);
  }

  getAllMesMessages(): any {
    this.http.get('http://localhost:8086/messagerie/' + this.userId).subscribe({
      next: (data) => {
        this.messages = data;this.getDestinataires();
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  rechercheMesMessages(){}

  afficherMesMessagesParExpediteur(login): any {
    // recherche: id
    this.fenetreEcrire = false;
    
    var id2 = 4;
    console.log("recher par 14");
    console.log('http://localhost:8086/messages/recherche/'+ this.userId + '/' + id2)
    this.http
      .get('http://localhost:8086/messages/recherche/'+ this.userId + '/' + id2)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messages = data;
          
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /*
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
  }*/

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



  




  
  /*
  conversionLoginId(login):any {
    this.http
    .get('http://localhost:8086/user/login/' + login).subscribe({
    next: (data) => { return data.id ; console.log("trouver" + data)
    },
    error: (err) => {
      console.log(err);4
    },
  });

  }*/

  

  trouverDestinataire(login): any {

    this.http
    .get('http://localhost:8086/user/login/' + login).subscribe({
    next: (data) => { this.destinataire = data; this.destinataireExist = data; console.log("trouver l138" + data)
    },
    error: (err) => {
      console.log(err);
    },
  });
  }

  ecrire(message): any {
    /*
 {
    "id": 47,
    "dateCreation": "2021-05-20T12:51:43.803+00:00",
    PRESENT "contenu": "Quels sont les délais de livraison ?",
    "expediteur": {
      "id": 1, PRESENT
      "login": "asterix",
      "password": "azerty",
      "mail": "asterix.legaulois@gmail.com",
      "tel": "06.65.83.92.01",
      "activity": true
    },
    "destinataire": null, PRESENT (LOGIN)
    "forum": {
      "id": 41,
      "sujet": "Détails sur la livraison",
      "logo": "fa fa-truck fa-2x"
    },
    "privee": false
  }
    */
    // ATTENTION A L'URL
    console.log("ecrire msg :" + message.login);
    console.log("ecrire msg" + this.userId);
    message.expediteur = this.userId;
    console.log('http://localhost:8086/message', message);

    this.http
      .post('http://localhost:8086/message', message)
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
        // Ecrire
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






  //Adrien tente des trucs
  destinataires=[];
  destinataireSet;

  getDestinataires(){
    
    this.destinataires=[];
    var destexists;
    for(let z of this.messages){
      destexists=false;
      for (let y of this.destinataires){
        if(z.expediteur.id==this.userId || z.expediteur.id==y.id){
          destexists=true
        }
      }
      if(!destexists){
        this.destinataires.push(z.expediteur);
      }
      destexists=false;
      for (let y of this.destinataires){
        if(z.destinataire.id==this.userId || z.destinataire.id==y.id){
          destexists=true
        }
      }
      if(!destexists){
        this.destinataires.push(z.destinataire);
      }
      /*
      console.log(z.contenu);
      destexists=false;
      if(z.expediteur.id!=this.userId){
        for(let y of this.destinataires){
          if(z.expediteur==y){
            destexists=true;
          }
        }
        if(!destexists){
          this.destinataires.push(z.expediteur);
        }
      }
      if(z.destinataire.id!=this.userId){
        destexists=false;
        for(let y of this.destinataires){
          if(z.destinataire==y){
            destexists=true;
          }
        }
        if(!destexists ){
          this.destinataires.push(z.destinataire);
        }
      }*/
    }
    this.setDestinataire(this.destinataireSet);
  }
  
  messagesAff;
  setDestinataire(destinataire){
    this.destinataireSet=destinataire;
    if(this.destinataireSet!=null){
      this.messagesAff=[];
      for(let m of this.messages){
        if (m.expediteur.id==this.destinataireSet.id && m.destinataire.id==this.userId){
          this.messagesAff.push(m);
        }
        if(m.expediteur.id==this.userId && m.destinataire.id==this.destinataireSet.id){
          console.log(m);
          this.messagesAff.push(m);
          console.log(this.messagesAff);
        }
      }
    }
  }

  newReponse(contenu){
    var newMessage={"contenu": contenu.contenu,"expediteur":{"id":this.userId},"destinataire":{"id":parseInt(this.destinataireSet.id)}};
      this.http.post('http://localhost:8086/message', newMessage).subscribe({
        next: (data) => { console.log(data);this.getAllMesMessages();},
        error: (err) => { console.log(err); }
      });

  }
}
