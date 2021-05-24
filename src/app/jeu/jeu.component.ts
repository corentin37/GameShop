import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../Services/jeu.service';
import { DepService } from '../Services/dep.service';




@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']

})
export class JeuComponent implements OnInit {
  moyenne;
  jeu;
  login;
  // valeur = ;
  avis;
  jeuId = this.jeuService.game.lejeu.id;


  constructor(private http: HttpClient, private route: Router, private jeuService: JeuService, private deployService: DepService) { }

  ngOnInit(): void {
    // this.getAllJeu();
    console.log(this.jeuId);
    this.getAllAvis();
    this.jeu = this.jeuService.game;
    console.log('contenu de jeu venu du service', this.jeu);
    this.getMoyenne();
    this.login = localStorage.getItem('id');
  }

  getAllAvis() {
    this.http.get(this.deployService.lienHttp + 'avis/jeu/' + this.jeuId).subscribe({
      next: (data) => { this.avis = data; },
      error: (err) => { console.log(err); }
    });
  }


getMoyenne(){
  this.http.get(this.deployService.lienHttp + 'avis/moyenne/' + this.jeuId).subscribe({
    next: (data) => {console.log(data); this.moyenne = data; },
    error: (err) => { console.log(err); }
  });
}

  newAvis(avis): any {
    // gérer user et jeu avec Service
    console.log('Avis posté! Rafraîchir la page');
    const user = {id : localStorage.getItem('id')};
    avis.user = user;
    avis.jeu = this.jeu.lejeu;
    if (!this.login){
      return confirm('Veuillez vous connecter');
    }
    if ((avis.note) && (this.login)) {

      this.http.post(this.deployService.lienHttp + 'avis', avis).subscribe({
        next: (data) => {console.log(data); window.scrollTo(0, 0); this.ngOnInit(); return confirm('Avis posté !'); },
        error: (err) => {console.log(err); }
      });
    }
    else {
      return confirm('Veuillez entrer une note');
   }

  }


  deleteAvis(avis){
    this.http.delete('http://localhost::8086/avis/delete', avis).subscribe({
      next: (data) => { return confirm('Avis effacé');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToPanier(isAchat){
    var user,bodySave,AlreadyPresent;
    console.log("begin adding game to basket ...");
    if(localStorage.getItem("id")!=null){ // on vérifie que l'utilisateur est connecté, sinon on le renvoie vers la page de connexion
      console.log("user detected : "+localStorage.getItem("id")+"\n Connecting ...");
  
      this.http.get("http://localhost:8086/user/id/"+localStorage.getItem("id")).subscribe({ // on récupère le user
        next: (data)=>{user=data;
              bodySave={"user":user,"jeuAchat":this.jeu,"quantite" : 1,"achat":isAchat}; // construction du body pour la requête d'ajout d'un jeu dans le panier
              console.log("bodysave : "+bodySave);console.log("user : "+user.id);console.log("jeuAchat : "+this.jeu.id);
  
             
              this.http.get(this.deployService.lienHttp + 'panier/userAndGame/'+user.id+"/"+this.jeu.id).subscribe({ // vérification de la non-présence du jeu dans le panier de l'utilisateur
                next: (data)=> {AlreadyPresent=data;
                  if(AlreadyPresent!=null){
                    alert(this.jeu.lejeu.nom + " est déjà dans le panier !");
                  }
                  else{
                    this.http.post(this.deployService.lienHttp + 'panier',bodySave).subscribe({  //ajout dans le panier
                      next: (data)=>{alert(this.jeu.lejeu.nom + " ajouté dans le panier !");},
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

}