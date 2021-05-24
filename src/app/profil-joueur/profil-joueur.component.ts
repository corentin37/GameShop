import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../Services/jeu.service';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-profil-joueur',
  templateUrl: './profil-joueur.component.html',
  styleUrls: ['./profil-joueur.component.css']
})
export class ProfilJoueurComponent implements OnInit {

  constructor(private http:HttpClient, private deployService: DepService, private route: Router ) { }

  user; 
  id;
  login;
  mail;
  tel;
  activity;
  password;
  avis;

  fenetreInfo= false;
      
  fenetreModification = false;
  fenetreAvis = false;

 
  
    ngOnInit(): void {
      this.id = localStorage.getItem("id")
      this.login = localStorage.getItem("login")
      this.mail = localStorage.getItem("mail")
      this.tel = localStorage.getItem("tel")
      this.activity = localStorage.getItem("activity")
      this.password = localStorage.getItem("password")
      this.getAllAvis();
      this.fenetreActivation(1);
  
  
    
    }

    fenetreActivation(chiffre): any {
      this.fenetreInfo= false;
      
      this.fenetreModification = false;
      this.fenetreAvis = false;
  
      switch (chiffre) {
        case 0: {
          // rien
          break;
        }
  
        case 1: {
          // creation info
          this.fenetreInfo = true;
          this.fenetreAvis = false;
          this.fenetreModification = false;
  
          break;
        }
        case 2: {
          //modification du profil
          this.fenetreInfo = false;
          this.fenetreModification = true;
          this.fenetreAvis = false;
          break;
        }
        case 3: {
          // Card avis
          this.fenetreInfo = false;
          this.fenetreModification = false;
          this.fenetreAvis = true;
          break;
        }
        default: {
          break;
        }
      }}


    submitInfo(user){
      
      console.log("submit");
      this.http.put(this.deployService.lienHttp + 'user/modifier', user).subscribe({
        next: (data)=> {localStorage.setItem("login", user.login);localStorage.setItem("activity", this.activity); localStorage.setItem("mail", user.mail); localStorage.setItem("password", user.password); localStorage.setItem("tel", user.tel);this.ngOnInit();  
            },
        error: (err) => {console.log(err);}
      });
  
    }


    getAllAvis() {
      console.log('En cours de suppression'),
      this.http.get(this.deployService.lienHttp + 'avis/user/' + this.id).subscribe({
        next: (data) => { this.avis = data; },
        error: (err) => { console.log(err); }
      });
    }


    deleteAvis(avis){
      console.log(avis.id),
        this.http.delete(this.deployService.lienHttp + 'avis/delete/'+ avis.id, avis).subscribe({
          next: (data) => {this.ngOnInit(); return confirm('Avis effacé');},
          error: (err) => {
            console.log(err);
          },
        });
      }
    

  }
