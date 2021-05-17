import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  jeux = [{image:"assets/img/monopoly.jpg", note: 4.5, marque: 'Hasbro Gaming', nom : 'Monopoly', prixAchat : 42.99, prixLocation : 15}, 
  {image:"assets/img/trivial.jpg", note: 4.3, marque: 'Hasbro Gaming', nom: 'Trivial Pursuit', prixAchat : 34.99, prixLocation : 15},
  {image:"assets/img/puissance.jpg", note:4.2, marque: 'Hasbro Gaming', nom : 'Puissance 4', prixAchat : 25.99, prixLocation : 10},
  {image:"assets/img/crocCarotte.jpg", note:4.0, marque: 'Ravensburger', nom : 'Croque-Carotte', prixAchat : 25.99, prixLocation : 8},
  {image:"assets/img/risk.jpg", note:4.6, marque: 'Hasbro Gaming', nom : 'Risk', prixAchat : 38.99, prixLocation : 15},
  {image:"assets/img/elefun.jpg", note:3.8, marque: 'Hasbro Gaming', nom : 'Elefun', prixAchat : 27.99, prixLocation : 8}
];


  constructor(private http: HttpClient) { }
  jeu;
  jeuAchat;
  ngOnInit(): void {
    this.getCatalogue();
  }
  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/list').subscribe({
      next: (data)=> {this.jeu = data; },
      error: (err)=> {console.log(err);}
      });
  
     
    
    }}