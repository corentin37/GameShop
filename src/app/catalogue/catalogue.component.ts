import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
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

user;
bodySave;
addToPanier(game){
  console.log("begin adding game to basket ...");
  if(localStorage.getItem("id")!=null){
    console.log("user detected : "+localStorage.getItem("id")+"\n Connecting ...");
    this.http.get("http://localhost:8086/user/id/"+localStorage.getItem("id")).subscribe({
      next: (data)=>{this.user=data;
            this.bodySave={"user":this.user,"jeuAchat":game,"quantite" : 1,"achat":true};
            console.log("bodysave : "+this.bodySave);console.log("user : "+this.user.id);console.log("jeuAchat : "+game.id);
            this.http.post('http://localhost:8086/panier',this.bodySave).subscribe({
              error: (err) => {console.log(err);}
            });
      },
      error: (err) => {console.log(err);}
    });
    
  }
  else{
    this.route.navigateByUrl('connexion');
  }
   
  
}
goToCategorie(c){
  console.log(c.libelle);
  this.route.navigateByUrl('catalogue');
  
}

goToMarque(m){
  console.log(m.libelle);
  this.route.navigateByUrl('catalogue');
  
}
    
    
  
    transmit(body): any{
      this.id = body;
    }
  
    
  }
  
