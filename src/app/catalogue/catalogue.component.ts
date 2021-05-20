import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  jeuAfficheTemp;
  categorie;
  marque;
  jeuAchat;
  id = 19;
  filterProperties;
  niveauxDifficulte=["Facile","Moyen","Difficile"];
moyenne;

  ngOnInit(): void {
    this.getCatalogue();
    this.getCategorie();
    this.getMarque();
    this.closeAllTabs();
    this.moyenne=localStorage.getItem("moyenne");
  }

  //------------------------------------------------------------------
  //gets initialisation
  getCatalogue() : any{
    this.http.get('http://localhost:8086/jeu/listJeuAchat').subscribe({
      next: (data)=> {this.jeu = data; this.jeuAffiche=this.jeu;this.initVariables(); },
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
    this.http.get ('http://localhost:8086/marquesOrdered').subscribe({
      next: (data)=> {this.marque = data; },
      error: (err)=> {console.log(err);}
    }) 
  }

  getProperties(){
    this.filterProperties=this.catalogueService;
    console.log(this.filterProperties);
  }

  initVariables(){
    this.ageMin=this.jeu[0].lejeu.ageMin;
    this.prixMin=this.jeu[0].prixAchat;
    this.prixMax=this.jeu[0].prixAchat;
    this.prixLocationMin=this.jeu[0].lejeu.prixLocation;
    this.prixLocationMax=this.jeu[0].lejeu.prixLocation;
    this.tempsJeuMin=this.jeu[0].lejeu.tempsDeJeu;
    this.tempsJeuMax=this.jeu[0].lejeu.tempsDeJeu;
    this.nombreJoueurs=1;
    for(let j of this.jeu){
      this.ageMin=Math.min(j.lejeu.ageMin,this.ageMin);
      this.prixMin=Math.min(j.prixAchat,this.prixMin);
      this.prixMax=Math.max(j.prixAchat,this.prixMax);
      this.prixLocationMin=Math.min(j.lejeu.prixLocation,this.prixLocationMin);
      this.prixLocationMax=Math.max(j.lejeu.prixLocation,this.prixLocationMax);
      this.tempsJeuMin=Math.min(j.lejeu.tempsDeJeu,this.tempsJeuMin);
      this.tempsJeuMax=Math.max(j.lejeu.tempsDeJeu,this.tempsJeuMax);
      this.moyenne=this.getMoyenne(j);
    }
  }
  
  getMoyenne(j){
    
    this.http.get('http://localhost:8086/avis/moyenne/' + j.id ).subscribe({
      next: (data) => {console.log(data); this.moyenne = data; },
      error: (err) => { console.log(err); }
    });
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

addToPanier(game){
  var user,bodySave,AlreadyPresent;
  console.log("begin adding game to basket ...");
  if(localStorage.getItem("id")!=null){ // on vérifie que l'utilisateur est connecté, sinon on le renvoie vers la page de connexion
    console.log("user detected : "+localStorage.getItem("id")+"\n Connecting ...");

    this.http.get("http://localhost:8086/user/id/"+localStorage.getItem("id")).subscribe({ // on récupère le user
      next: (data)=>{user=data;
            bodySave={"user":user,"jeuAchat":game,"quantite" : 1,"achat":true}; // construction du body pour la requête d'ajout d'un jeu dans le panier
            console.log("bodysave : "+bodySave);console.log("user : "+user.id);console.log("jeuAchat : "+game.id);

           
            this.http.get('http://localhost:8086/panier/userAndGame/'+user.id+"/"+game.id).subscribe({ // vérification de la non-présence du jeu dans le panier de l'utilisateur
              next: (data)=> {AlreadyPresent=data;
                if(AlreadyPresent!=null){
                  alert(game.lejeu.nom + " est déjà dans le panier !");
                }
                else{
                  this.http.post('http://localhost:8086/panier',bodySave).subscribe({  //ajout dans le panier
                    next: (data)=>{alert(game.lejeu.nom + " ajouté dans le panier !");},
                    error: (err) => {console.log(err);}
                  });
                }
              },
              error: (err)=> {console.log(err);}
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

prixLocationMin=0;
prixLocationMinMoins(){
  this.prixLocationMin-=1.00;
  if(this.prixLocationMin<0){
    this.prixLocationMin=0;
  }
}
prixLocationMinPlus(){
  this.prixLocationMin+=1.00;
  if(this.prixLocationMin>this.prixLocationMax){
    this.prixLocationMin=this.prixLocationMax;
  }
}

prixLocationMax=0;
prixLocationMaxMoins(){
  this.prixLocationMax-=1.00;
  if (this.prixLocationMax<this.prixLocationMin){
    this.prixLocationMax=this.prixLocationMin;
  }
}
prixLocationMaxPlus(){
  this.prixLocationMax+=1.00;
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

nombreJoueurs=0;
nombreJoueursMoins(){
  this.nombreJoueurs-=1;
  if(this.nombreJoueurs<0){
    this.nombreJoueurs=0;
  }
}
nombreJoueursPlus(){
  this.nombreJoueurs+=1.00;
}

tempsJeuMin=0;
tempsJeuMinMoins(){
  this.tempsJeuMin-=15.00;
  if(this.tempsJeuMin<0){
    this.tempsJeuMin=0;
  }
}
tempsJeuMinPlus(){
  this.tempsJeuMin+=15.00;
  if(this.tempsJeuMin>this.tempsJeuMax){
    this.tempsJeuMin=this.tempsJeuMax;
  }
}

tempsJeuMax=0;
tempsJeuMaxMoins(){
  this.tempsJeuMax-=15.00;
  if (this.tempsJeuMax<this.tempsJeuMin){
    this.tempsJeuMax=this.tempsJeuMin;
  }
}
tempsJeuMaxPlus(){
  this.tempsJeuMax+=15.00;
}

myFunction(){
  console.log("ça passe par le focusout");
  console.log(document.getElementById("ageMin").nodeValue);
}


//-------------------------------------------------------
//filtrages

refreshFilters(){
  this.getProperties();
  this.jeuAffiche=this.jeu;
  // tri par catégorie
  if(this.catalogueService.categorie!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if(j.lejeu.categorieDuJeu.libelle==this.catalogueService.categorie.libelle){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par marque
  if(this.catalogueService.marque!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if(j.lejeu.marqueDuJeu.libelle==this.catalogueService.marque.libelle){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par ageMin
  if(this.catalogueService.ageMin!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if(j.lejeu.ageMin>=this.catalogueService.ageMin){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par prix d'achat
  if(this.catalogueService.prixMin!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if((j.prixAchat>=this.catalogueService.prixMin) && (j.prixAchat<=this.catalogueService.prixMax)){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par prix de location
   if(this.catalogueService.prixLocationMin!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if((j.lejeu.prixLocation>=this.catalogueService.prixLocationMin) && (j.lejeu.prixLocation<=this.catalogueService.prixLocationMax)){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  //tri par nombre de joueurs
  if(this.catalogueService.nombreJoueurs!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if((j.lejeu.nombreJoueursMin<=this.catalogueService.nombreJoueurs) && (j.lejeu.nombreJoueursMax>=this.catalogueService.nombreJoueurs)){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par temps de jeu
  if(this.catalogueService.tempsJeuMin!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if((j.lejeu.tempsDeJeu>=this.catalogueService.tempsJeuMin) && (j.lejeu.tempsDeJeu<=this.catalogueService.tempsJeuMax)){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
  }

  // tri par niveau de difficulté
  if(this.catalogueService.niveauDifficulte!=null){
    this.jeuAfficheTemp=[];
    for(let j of this.jeuAffiche){
      if((j.lejeu.niveauDifficulte>=this.catalogueService.niveauDifficulte) && (j.lejeu.niveauDifficulte<=this.catalogueService.niveauDifficulte)){
        this.jeuAfficheTemp.push(j);
      }
    }
    this.jeuAffiche=this.jeuAfficheTemp;
}
}

reinitialisationFiltrage(){
  this.catalogueService.categorie=null;
  this.catalogueService.marque=null;
  this.catalogueService.ageMin=null;
  this.catalogueService.prixMin=null;
  this.catalogueService.prixMax=null;
  this.catalogueService.prixLocationMin=null;
  this.catalogueService.prixLocationMax=null;
  this.catalogueService.nombreJoueurs=null;
  this.catalogueService.tempsJeuMin=null;
  this.catalogueService.tempsJeuMax=null;
  this.catalogueService.niveauDifficulte=null;
  this.refreshFilters();
}



filterByCategorie(c){
  console.log(c.libelle);
  if(this.catalogueService.categorie!=c){
    this.catalogueService.categorie=c;
  }
  else{
    this.catalogueService.categorie=null;
  }
  this.refreshFilters();
}

filterByMarque(m){
  console.log(m.libelle);
  if(this.catalogueService.marque!=m){
    this.catalogueService.marque=m;
  }
  else{
    this.catalogueService.marque=null;
  }
  this.refreshFilters();
}

filterByAge(){
  console.log(this.ageMin);
  this.catalogueService.ageMin=this.ageMin;
  this.refreshFilters();
}
    
filterByPrix(){
  console.log(this.prixMin,this.prixMax);
  this.catalogueService.prixMin=this.prixMin;
  this.catalogueService.prixMax=this.prixMax;
  this.refreshFilters();
}

filterByPrixLocation(){
  console.log(this.prixLocationMin,this.prixLocationMax);
  this.catalogueService.prixLocationMin=this.prixLocationMin;
  this.catalogueService.prixLocationMax=this.prixLocationMax;
  this.refreshFilters();
}

filterByNombreJoueurs(){
  console.log(this.nombreJoueurs);
  this.catalogueService.nombreJoueurs=this.nombreJoueurs;
  this.refreshFilters();
}

filterByTempsJeu(){
  console.log(this.tempsJeuMin,this.tempsJeuMax);
  this.catalogueService.tempsJeuMin=this.tempsJeuMin;
  this.catalogueService.tempsJeuMax=this.tempsJeuMax;
  this.refreshFilters();
}

filterByNiveauDifficulte(niveauDifficulte){
  console.log(niveauDifficulte);
  if(this.catalogueService.niveauDifficulte!=niveauDifficulte){
    this.catalogueService.niveauDifficulte=niveauDifficulte;
  }
  else{
    this.catalogueService.niveauDifficulte=null;
  }
  this.refreshFilters();
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
    document.getElementById("tablink"+TabName).className+=" active";
    
    if(memo == "block"){
      document.getElementById(TabName).style.display = "none";
      document.getElementById("tablink"+TabName).className.replace(" active", "");
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
  

  
