import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { HistoriqueSalleService } from '../Services/historique-salle.service';
import { JeuService } from '../Services/jeu.service';
import { PanierService } from '../Services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  prixTotalAchat;
  prixTotalLocation;
  paniertest = [{ jeu: { image: "assets/img/monopoly.jpg", note: 4.5, marque: 'Hasbro Gaming', nom: 'Monopoly', prixAchat: 42.99, prixLocation: 15 }, quantite: 2 },
  { jeu: { image: "assets/img/trivial.jpg", note: 4.3, marque: 'Hasbro Gaming', nom: 'Trivial Pursuit', prixAchat: 34.99, prixLocation: 15 }, quantite: 1 },
  { jeu: { image: "assets/img/puissance.jpg", note: 4.2, marque: 'Hasbro Gaming', nom: 'Puissance 4', prixAchat: 25.99, prixLocation: 10 }, quantite: 3 },
  { jeu: { image: "assets/img/crocCarotte.jpg", note: 4.0, marque: 'Ravensburger', nom: 'Croque-Carotte', prixAchat: 25.99, prixLocation: 8 }, quantite: 1 },
  { jeu: { image: "assets/img/risk.jpg", note: 4.6, marque: 'Hasbro Gaming', nom: 'Risk', prixAchat: 38.99, prixLocation: 15 }, quantite: 1 },
  { jeu: { image: "assets/img/elefun.jpg", note: 3.8, marque: 'Hasbro Gaming', nom: 'Elefun', prixAchat: 27.99, prixLocation: 8 }, quantite: 1 }
  ];
  panier;
  panierAchat = [];
  panierLocation = [];
  alljeux: Object;
  iduser = localStorage.getItem("id");
  count;
  idCard;
  historiqueTest = [{"id": 118, "dateDebut": "2021-01-23T07:00:00.000+00:00", 
  "dateFin": "2021-01-23T15:00:00.000+00:00",
    "locationValidee": false, "salle": {"id": 108, "nom": "Paris", "prix": 20.0, "nombreDePlaces": 8, 
    "publique": true, 
    "urlImage": "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_960_720.jpg"
    },
    "joueur": {"id": 22, "cotisation": true, "user": {"id": 1, "login": "asterix", "password": "azerty",
        "mail": "asterix.legaulois@village-gaulois.ga", "tel": "06.65.83.92.01", "activity": true
      }
    },
    "vendeur": {
      "id": 87,
      "user": {
        "id": 5,
        "login": "Vendeur",
        "password": "Vendeur",
        "mail": "vendeur@vendeur.fr",
        "tel": "01.35.28.75.64",
        "activity": true
      }
    },
    "joueurMaitreSalle": {
      "id": 22,
      "cotisation": true,
      "user": {
        "id": 1,
        "login": "asterix",
        "password": "azerty",
        "mail": "asterix.legaulois@village-gaulois.ga",
        "tel": "06.65.83.92.01",
        "activity": true
      }
    }
  },
  {
    "id": 120,
    "dateDebut": "2021-01-29T07:00:00.000+00:00",
    "dateFin": "2021-01-29T15:00:00.000+00:00",
    "locationValidee": false,
    "salle": {
      "id": 109,
      "nom": "Lyon",
      "prix": 20.0,
      "nombreDePlaces": 8,
      "publique": true,
      "urlImage": "https://cdn.pixabay.com/photo/2017/06/08/08/28/lyon-2382879_960_720.jpg"
    },
    "joueur": {
      "id": 22,
      "cotisation": true,
      "user": {
        "id": 1,
        "login": "asterix",
        "password": "azerty",
        "mail": "asterix.legaulois@village-gaulois.ga",
        "tel": "06.65.83.92.01",
        "activity": true
      }
    },
    "vendeur": {
      "id": 87,
      "user": {
        "id": 5,
        "login": "Vendeur",
        "password": "Vendeur",
        "mail": "vendeur@vendeur.fr",
        "tel": "01.35.28.75.64",
        "activity": true
      }
    },
    "joueurMaitreSalle": {
      "id": 22,
      "cotisation": true,
      "user": {
        "id": 1,
        "login": "asterix",
        "password": "azerty",
        "mail": "asterix.legaulois@village-gaulois.ga",
        "tel": "06.65.83.92.01",
        "activity": true
      }
    }
  }
  ];
  historique;
  prixTotalLocationSalle;
  panierLocationSalle;
  historiqueAchat;
  historiqueLocation;
  historiquejeu;

  constructor(private http: HttpClient, private route: Router, private jeuService: JeuService, private historiqueService: HistoriqueSalleService, private panierService: PanierService) { }

  ngOnInit(): void {
    this.getOnePanierByUser(this.iduser);
    this.openPanier("Panier Achat");
    this.getHistoriqueUser();
    // this.getPrixPanierLocationSalle();
    this.getHistoriqueSalle();
    // this.historique=this.historiqueTest;
  }

  getOnePanierByUser(iduser) {
    this.http.get('http://localhost:8086/panier/user/' + iduser).subscribe({
      next: (data) => { this.panier = data; console.log("panier : ", this.panier); this.getPrixTotaux(this.panier); this.definePanierAchatAndPanierLocation(); },
      error: (err) => { console.log(err); }
    });
  }

  getAllPaniers(): any {
    this.http.get('http://localhost:8086/paniers').subscribe({
      next: (data) => { this.panier = data; },
      error: (err) => { console.log(err); }
    });
  }

  definePanierAchatAndPanierLocation(): any {
    for (let j of this.panier) {
      if (j.achat) {
        this.panierAchat.push(j);
      }
      else {
        this.panierLocation.push(j);
      }
    }
  }

  getPrixTotaux(panier): any {
    this.prixTotalAchat = 0;
    this.prixTotalLocation = 0;
    for (let j of panier) {
      if (j.achat) {
        this.prixTotalAchat += j.jeuAchat.prixAchat * j.quantite;

      }
      else {
        this.prixTotalLocation += j.jeuAchat.lejeu.prixLocation * j.quantite;
      }
    }
    this.prixTotalAchat = this.prixTotalAchat.toFixed(2);
    this.prixTotalLocation = this.prixTotalLocation.toFixed(2);
  }

  goToJeu(game): any {
    this.jeuService.game = game;
    console.log('jeu dans le service', this.jeuService.game);
    this.route.navigateByUrl('jeu');

  }

  getHistoriqueUser() {
    this.http.get('http://localhost:8086/histoLoc/user/' + localStorage.getItem("id")).subscribe({
      next: (data) => {
        console.log(data);
        this.historiqueLocation = data;
        this.http.get('http://localhost:8086/histoAchat/user/' + localStorage.getItem("id")).subscribe({
          next: (data) => {
            console.log(data);
            this.historiqueAchat = data; this.historiquejeu = this.historiqueAchat.concat(this.historiqueLocation)
          },
          error: (err) => { console.log(err); }
        });
      },
      error: (err) => { console.log(err); }
    });

  }
  convertBoolean(b) {
    if (b == true) {
      return "Oui";
    }
    else {
      return "En attente";
    }
  }

  quantiteMoins(jeu) {
    if (jeu.quantite > 0) {
      jeu.quantite -= 1;
      this.http.put('http://localhost:8086/panier', jeu).subscribe({
        next: (data) => {
          console.log(data);

          this.getPrixTotaux(this.panier);
          this.route.navigateByUrl('panier');
        },
        error: (err) => { console.log(err); }
      });
    }

  }

  quantitePlus(jeu) {
    jeu.quantite += 1;
    this.http.put('http://localhost:8086/panier', jeu).subscribe({
      next: (data) => {
        console.log(data);
        this.route.navigateByUrl('panier');
        this.getPrixTotaux(this.panier);
      },
      error: (err) => { console.log(err); }
    });
  }


  supprimerJeu(jeu) {
    console.log(jeu.id);
    this.http.delete('http://localhost:8086/panier/' + jeu.id).subscribe({
      next: (data) => {
        console.log(data);
        this.panierAchat = [];
        this.panierLocation = [];
        this.getOnePanierByUser(this.iduser);
      },
      error: (err) => { console.log(err); }
    });
  }

  changeAchatLocation(j) {
    j.achat = !j.achat;
    this.http.put('http://localhost:8086/panier', j).subscribe({
      next: (data) => {
        console.log(data);
        this.panierAchat = [];
        this.panierLocation = [];
        this.getOnePanierByUser(this.iduser);
      },
      error: (err) => { console.log(err); }
    });

  }

  histoAchats() {
    this.historiquejeu = this.historiqueAchat;
  }
  histoLocations() {
    this.historiquejeu = this.historiqueLocation;
  }
  histoAll() {
    this.historiquejeu = this.historiqueAchat.concat(this.historiqueLocation);
  }

  openPanier(PanierName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(PanierName).style.display = "block";
    document.getElementById("tablink" + PanierName).className += " active";
  }

  getPrixPanierLocationSalle(): any {
    this.panierLocationSalle = this.historique;
    for (let p of this.panierLocationSalle) {
      this.prixTotalLocationSalle = p.salle.prix;
    }
  }


  goToConfirmationAchat() {
    this.panierService.panierAchat = this.panierAchat;
    this.panierService.panierLocation = this.panierLocation;
    this.panierService.panierSalles = this.historique;
    this.panierService.prixTotalAchat = this.prixTotalAchat;
    this.panierService.prixTotalLocation = this.prixTotalLocation;
    this.route.navigateByUrl("/confirmationAchat");
  }

  getHistoriqueSalle() {
    var idUser;
    idUser = localStorage.getItem('id');
    this.http.get('http://localhost:8086/salle/historiqueUser/' + idUser).subscribe({
      next: (data) => {
        console.log(data);
        //l'historique des salles
        this.historique = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /* changeDateFormat(date){
    var dateJJMMAAAA;
    let jour=date.getDate();
    let mois=date.getMonth();
    let annee=date.getFullYear();
    dateJJMMAAAA=jour+"/"+mois+"/"+annee;
    return dateJJMMAAAA;    
  } */
}

