import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../Services/jeu.service';




@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']

})
export class JeuComponent implements OnInit {
  moyenne;
  jeu;
  login;
  //valeur = ;
  avis;
  avisnew;
  jeuId = this.jeuService.game.lejeu.id;


  constructor(private http: HttpClient, private route: Router, private jeuService: JeuService) { }

  ngOnInit(): void {
    // this.getAllJeu();
    console.log(this.jeuId);
    this.getAllAvis();
    this.jeu = this.jeuService.game;
    console.log('contenu de jeu venu du service', this.jeu);
    this.getMoyenne();
    this.login=localStorage.getItem("id");
  }

  getAllAvis() {
    this.http.get('http://localhost:8086/avis/jeu/'+ this.jeuId).subscribe({
      next: (data) => { this.avis = data; },
      error: (err) => { console.log(err); }
    });
  }

getMoyenne(){
  this.http.get('http://localhost:8086/avis/moyenne/'+this.jeuId).subscribe({
    next: (data) => {console.log(data); this.moyenne =data; },
    error: (err) => { console.log(err); }
  });
}
 
  newAvis(avis): any {
    //gérer user et jeu avec Service
    console.log("Avis posté! Rafraîchir la page");
    const user ={id :localStorage.getItem("id")};
    avis.user=user;
    avis.jeu=this.jeu.lejeu;
    if(!this.login){
      return confirm('Veuillez vous connecter');
    }
    if ((avis.note)&&(this.login)) {
      
      this.http.post('http://localhost:8086/avis', avis).subscribe({
        next: (data)=> {console.log(data); window.scrollTo(0,0); this.ngOnInit(); return confirm('Avis posté !'); },
        error: (err) => {console.log(err);}
      });
    }
    else {
      return confirm('Veuillez entrer une note');
   }

  }

  deleteAvis(avis){
    this.http.delete('http://localhost::8086/avis/delete',avis).subscribe({
      next: (data) => { return confirm('Avis effacé');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  


}
