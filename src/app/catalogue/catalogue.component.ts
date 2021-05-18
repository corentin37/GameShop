import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { getEnabledCategories } from 'trace_events';
import { JeuService } from '../Services/jeu.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  



  constructor(private http: HttpClient, private route : Router, private jeuService : JeuService) { }
  jeu;
  categorie;
  marque;
  jeuAchat;
  id = 19;
  ngOnInit(): void {
    this.getCatalogue();
    this.getCategorie();
    this.getMarque();

  }
  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/listJeuAchat').subscribe({
      next: (data)=> {this.jeu = data; },
      error: (err)=> {console.log(err);}
      });
    }
  getCategorie(): any{
    this.http.get ('http://localhost:8086/categories').subscribe({
      next: (data)=> {this.categorie = data;console.log(data) },
      error: (err)=> {console.log(err);}
    })
  }
  getMarque(): any{
    this.http.get ('http://localhost:8086/marques').subscribe({
      next: (data)=> {this.marque = data; },
      error: (err)=> {console.log(err);}
    })

    
  }
  
  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  


  goToJeu(game): any{
    this.jeuService.game=game;
    console.log('jeu dan sle service', this.jeuService.game);
    this.route.navigateByUrl('jeu');

  }  
goToPanier(){
  this.route.navigateByUrl('panier');
   
  
}

    
    
  
    transmit(body): any{
      this.id = body;
    }
  
    
  }
  
