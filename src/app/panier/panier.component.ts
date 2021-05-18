import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { JeuService } from '../Services/jeu.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  prixTotalAchat;
  prixTotalLocation;
  paniertest=[{jeu:{image:"assets/img/monopoly.jpg", note: 4.5, marque: 'Hasbro Gaming', nom : 'Monopoly', prixAchat : 42.99, prixLocation : 15},quantite:2}, 
  {jeu:{image:"assets/img/trivial.jpg", note: 4.3, marque: 'Hasbro Gaming', nom: 'Trivial Pursuit', prixAchat : 34.99, prixLocation : 15},quantite:1},
  {jeu:{image:"assets/img/puissance.jpg", note:4.2, marque: 'Hasbro Gaming', nom : 'Puissance 4', prixAchat : 25.99, prixLocation : 10},quantite:3},
  {jeu:{image:"assets/img/crocCarotte.jpg", note:4.0, marque: 'Ravensburger', nom : 'Croque-Carotte', prixAchat : 25.99, prixLocation : 8},quantite:1},
  {jeu:{image:"assets/img/risk.jpg", note:4.6, marque: 'Hasbro Gaming', nom : 'Risk', prixAchat : 38.99, prixLocation : 15},quantite:1},
  {jeu:{image:"assets/img/elefun.jpg", note:3.8, marque: 'Hasbro Gaming', nom : 'Elefun', prixAchat : 27.99, prixLocation : 8},quantite:1}
  ];
  panier;
  panierAchat=[];
  panierLocation=[];
  alljeux: Object;
  iduser=5;
  count;


  constructor(private http: HttpClient,private route: Router, private jeuService : JeuService) { }

  ngOnInit(): void {
    this.getOnePanierByUser(this.iduser);
    //this.getPrixTotaux();
  }
  
  getOnePanierByUser(iduser){
    this.http.get('http://localhost:8086/panier/user/'+iduser).subscribe({
      next: (data) => {this.panier = data;console.log("panier : ",this.panier);this.getPrixTotaux(this.panier);this.definePanierAchatAndPanierLocation()},
      error: (err) => {console.log(err);}
    });
  }

  getAllPaniers() : any{
    this.http.get('http://localhost:8086/paniers').subscribe({
      next: (data)=> {this.panier = data; },
      error: (err)=> {console.log(err);}
      });
    }
  
  definePanierAchatAndPanierLocation():any{
    for(let j of this.panier){
      if(j.achat){
        this.panierAchat.push(j);
      }
      else{
        this.panierLocation.push(j);
      }
    }
  }
  
  getPrixTotaux(panier):any{
    this.prixTotalAchat=0;
    this.prixTotalLocation=0;
    for (let j of panier) {
      if(j.achat){
        this.prixTotalAchat+=j.jeuAchat.prixAchat*j.quantite;
      }
      else{
        this.prixTotalLocation+=j.jeuAchat.lejeu.prixLocation*j.quantite;
      }
      
    }
  }

  goToJeu(game): any{
    this.jeuService.game=game;
    console.log('jeu dans le service', this.jeuService.game);
    this.route.navigateByUrl('jeu');

  }  


  quantiteMoins(jeu){
    if(jeu.quantite>0){
      jeu.quantite-=1;
      this.http.put('http://localhost:8086/panier', jeu).subscribe({
        next: (data) => {console.log(data); 
          this.route.navigateByUrl('panier');
          this.getPrixTotaux(this.panier);
        },
        error: (err) => {console.log(err); }
      });
    }
    
  }

  quantitePlus(jeu){
    jeu.quantite+=1;
    this.http.put('http://localhost:8086/panier', jeu).subscribe({
      next: (data) => {console.log(data); 
        this.route.navigateByUrl('panier');
        this.getPrixTotaux(this.panier);
      },
      error: (err) => {console.log(err); }
    });
  }


  supprimerJeu(jeu){
    console.log(jeu.id);
    this.http.delete('http://localhost:8086/panier/'+jeu.id).subscribe({
      next: (data) => {console.log(data); 
        this.route.navigateByUrl('panier');
        this.count = 0;
          for (let k of this.panier){
            if(jeu.id = k.id){
              this.panier.splice(this.count,1);
            }
            this.count+=1;
        }
        this.getPrixTotaux(this.panier);
      },
      error: (err) => {console.log(err); }
    });
  }
}
