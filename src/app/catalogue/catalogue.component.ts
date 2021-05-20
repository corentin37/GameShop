import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../Services/catalogue.service';
import { JeuService } from '../Services/jeu.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  



  constructor(private http: HttpClient, private route : Router, private jeuService : JeuService, private catalogueService : CatalogueService) { }
  jeu;
  jeuAffiche;
  categorie;
  marque;
  jeuAchat;
  id = 19;
  filterProperties;
  niveauxDifficulte=["Facile","Moyen","Difficile"];
  ngOnInit(): void {
    this.getCatalogue();
    this.getCategorie();
    this.getMarque();
    this.closeAllTabs();
  }

  //------------------------------------------------------------------
  //gets initialisation
  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/listJeuAchat').subscribe({
      next: (data)=> {this.jeu = data; this.jeuAffiche=this.jeu },
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

  getProperties(){
    this.filterProperties=this.catalogueService;
  }
  
  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  //-------------------------------
  // Redirection
  goToJeu(game): any{
    this.jeuService.game=game;
    console.log('jeu dans le service', this.jeuService.game);
    this.route.navigateByUrl('jeu');

  }  


  //------------------------------------------------
  //actions
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

prixMin=0;
prixMinMoins(){
  this.prixMin-=1.00;
  if(this.prixMin<0){
    this.prixMin=0;
  }
}
prixMinPlus(){
  this.prixMin+=1.00;
  if(this.prixMin>this.prixMax){
    this.prixMin=this.prixMax;
  }
}

prixMax=0;
prixMaxMoins(){
  this.prixMax-=1.00;
  if (this.prixMax<this.prixMin){
    this.prixMax=this.prixMin;
  }
}
prixMaxPlus(){
  this.prixMax+=1.00;
}

ageMin=0;
ageMinMoins(){
  this.ageMin-=1;
  if(this.ageMin<0){
    this.ageMin=0;
  }
}
ageMinPlus(){
  this.ageMin+=1;
}

nombreJoueursMin=0;
nombreJoueursMinMoins(){
  this.nombreJoueursMin-=1.00;
  if(this.nombreJoueursMin<0){
    this.nombreJoueursMin=0;
  }
}
nombreJoueursMinPlus(){
  this.nombreJoueursMin+=1.00;
  if(this.nombreJoueursMin>this.nombreJoueursMax){
    this.nombreJoueursMin=this.nombreJoueursMax;
  }
}

nombreJoueursMax=0;
nombreJoueursMaxMoins(){
  this.nombreJoueursMax-=1.00;
  if (this.nombreJoueursMax<this.nombreJoueursMin){
    this.nombreJoueursMax=this.nombreJoueursMin;
  }
}
nombreJoueursMaxPlus(){
  this.nombreJoueursMax+=1.00;
}

tempsJeuMin=0;
tempsJeuMinMoins(){
  this.tempsJeuMin-=1.00;
  if(this.tempsJeuMin<0){
    this.tempsJeuMin=0;
  }
}
tempsJeuMinPlus(){
  this.tempsJeuMin+=1.00;
  if(this.tempsJeuMin>this.tempsJeuMax){
    this.tempsJeuMin=this.tempsJeuMax;
  }
}

tempsJeuMax=0;
tempsJeuMaxMoins(){
  this.tempsJeuMax-=1.00;
  if (this.tempsJeuMax<this.tempsJeuMin){
    this.tempsJeuMax=this.tempsJeuMin;
  }
}
tempsJeuMaxPlus(){
  this.tempsJeuMax+=1.00;
}

myFunction() {
  console.log("ça passe par le focusout");
  console.log(document.getElementById("ageMin").nodeValue);
}


//-------------------------------------------------------
//filtrages

filterByCategorie(c){
  console.log(c.libelle);
  if(this.catalogueService.categorie!=c){
    this.catalogueService.categorie=c;
  }
  else{
    this.catalogueService.categorie=null;
  }
}

filterByMarque(m){
  console.log(m.libelle);
  if(this.catalogueService.marque!=m){
    this.catalogueService.marque=m;
  }
  else{
    this.catalogueService.marque=null;
  }
  
}

filterByAge(){
  console.log(this.ageMin);
  this.catalogueService.ageMin=this.ageMin;
}
    
filterByPrix(){
  console.log(this.prixMin,this.prixMax);
  this.catalogueService.prixMin=this.prixMin;
  this.catalogueService.prixMax=this.prixMax;
}

filterByNombreJoueurs(){
  console.log(this.nombreJoueursMin,this.nombreJoueursMax);
  this.catalogueService.nombreJoueursMin=this.nombreJoueursMin;
  this.catalogueService.nombreJoueursMax=this.nombreJoueursMax;
}

filterByTempsJeu(){
  console.log(this.tempsJeuMin,this.tempsJeuMax);
  this.catalogueService.tempsJeuMin=this.tempsJeuMin;
  this.catalogueService.tempsJeuMax=this.tempsJeuMax;
}

filterByNiveauDifficulte(niveauDifficulte){
  console.log(niveauDifficulte);
  this.catalogueService.niveauDifficulte=niveauDifficulte;
}

  //---------------------------------
  //Aucune idée  
  
  transmit(body): any{
    this.id = body;
  }

  
//-----------------------------------------
//Dynamisme de l'affichage

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
      
  }

  openCloseTab(TabName) {
    var i, tabcontent, tablinks,memo;
    memo = document.getElementById(TabName).style.display;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(memo == "block"){
      document.getElementById(TabName).style.display = "none";
    }
    else{
      document.getElementById(TabName).style.display = "block";
    }
    
  }

  closeAllTabs(){
    var i,tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  }




}
  

  
