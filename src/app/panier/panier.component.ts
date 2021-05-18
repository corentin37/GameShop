import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  jeu;
  jeux;
  idjeu;
  prixTotalAchat=0;
  prixTotalLocation=0;
  panier=[{image:"assets/img/monopoly.jpg", note: 4.5, marque: 'Hasbro Gaming', nom : 'Monopoly', prixAchat : 42.99, prixLocation : 15,quantite:2}, 
  {image:"assets/img/trivial.jpg", note: 4.3, marque: 'Hasbro Gaming', nom: 'Trivial Pursuit', prixAchat : 34.99, prixLocation : 15,quantite:1},
  {image:"assets/img/puissance.jpg", note:4.2, marque: 'Hasbro Gaming', nom : 'Puissance 4', prixAchat : 25.99, prixLocation : 10,quantite:3},
  {image:"assets/img/crocCarotte.jpg", note:4.0, marque: 'Ravensburger', nom : 'Croque-Carotte', prixAchat : 25.99, prixLocation : 8,quantite:1},
  {image:"assets/img/risk.jpg", note:4.6, marque: 'Hasbro Gaming', nom : 'Risk', prixAchat : 38.99, prixLocation : 15,quantite:1},
  {image:"assets/img/elefun.jpg", note:3.8, marque: 'Hasbro Gaming', nom : 'Elefun', prixAchat : 27.99, prixLocation : 8,quantite:1}
  ];

  alljeux: Object;

  constructor(private http: HttpClient,private route: Router) { }

  ngOnInit(): void {
    this.getCatalogue();
    this.getPrixTotaux();
  }
  
  getOneJeu(idjeu){
    this.http.get('http://localhost:8086/jeu/'+idjeu).subscribe({
      next: (data) => {this.jeu = data;},
      error: (err) => {console.log(err);}
    });
  }

  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/listJeuAchat').subscribe({
      next: (data)=> {this.alljeux = data; },
      error: (err)=> {console.log(err);}
      });
    }
  
  getPrixTotaux():any{
    this.prixTotalAchat=0;
    this.prixTotalLocation=0;
        for (let j of this.panier) {
      this.prixTotalAchat+=j.prixAchat*j.quantite;
      this.prixTotalLocation+=j.prixLocation*j.quantite;
    }
  }

  setQuantiteMoins(id){

  }

  setQuantitePlus(id){
    
  }
}
