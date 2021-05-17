import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

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
  id = 19;
  ngOnInit(): void {
    this.getCatalogue();
    this.getJeu();
  }
  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/listJeuAchat').subscribe({
      next: (data)=> {this.jeu = data; },
      error: (err)=> {console.log(err);}
      });
  

      


 /*longueurDuNom(nomJeu): String{
        if(nomJeu.length() <= 34){
          return nom.nom + "";
          
        }
        else{
          return nomJeu.nom;
        }
      }*/
    
    }
  
    transmit(body): any{
      this.id = body;
    }
  
    getJeu() : any{
      this.http.get('http://localhost:8086/jeu/' + this.id).subscribe({
        next: (data)=> {this.jeu = data; },
        error: (err)=> {console.log(err);}
        });

      }
  }