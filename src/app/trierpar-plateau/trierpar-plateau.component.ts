import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../Services/jeu.service';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-trierpar-plateau',
  templateUrl: './trierpar-plateau.component.html',
  styleUrls: ['./trierpar-plateau.component.css']
})
export class TrierparPlateauComponent implements OnInit {

  constructor(private http: HttpClient, private route : Router, private jeuService : JeuService, private deployService: DepService) { }
  jeu;
  categorie;
  marque;
  ngOnInit(): void {
    this.getCatalogue();
    this.getCategorie();
    this.getMarque();
  }
  getCatalogue() : any{
    this.http.get(this.deployService.lienHttp + 'jeu/listJeuAchat').subscribe({
      next: (data)=> {this.jeu = data; },
      error: (err)=> {console.log(err);}
      });
    }
  getCategorie(): any{
    this.http.get (this.deployService.lienHttp + 'categories').subscribe({
      next: (data)=> {this.categorie = data;console.log(data) },
      error: (err)=> {console.log(err);}
    })
  }
  getMarque(): any{
    this.http.get (this.deployService.lienHttp + 'marques').subscribe({
      next: (data)=> {this.marque = data; },
      error: (err)=> {console.log(err);}
    })

    
  }
  goToJeu(game): any{
    this.jeuService.game=game;
    console.log('jeu dan sle service', this.jeuService.game);
    this.route.navigateByUrl('jeu');

  }  

goToPanier(){
  this.route.navigateByUrl('panier');
   
  
}
}
