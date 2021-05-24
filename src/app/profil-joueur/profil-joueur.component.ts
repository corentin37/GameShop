import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService } from '../Services/jeu.service';

@Component({
  selector: 'app-profil-joueur',
  templateUrl: './profil-joueur.component.html',
  styleUrls: ['./profil-joueur.component.css']
})
export class ProfilJoueurComponent implements OnInit {

  constructor(private http:HttpClient, private route: Router ) { }

  user; 
  id;
  login;
  mail;
  tel;
  activity;
  password;
  avis;
  message;
  fenetreInfo= false;
      
  fenetreModification = false;
  fenetreAvis = false;
  fenetreMessage = false;

 
  
    ngOnInit(): void {
      this.id = localStorage.getItem("id")
      this.login = localStorage.getItem("login")
      this.mail = localStorage.getItem("mail")
      this.tel = localStorage.getItem("tel")
      this.activity = localStorage.getItem("activity")
      this.password = localStorage.getItem("password")
      this.getAllAvis();
      this.fenetreActivation(1);
      this.getAllMessage();
  
  
    
    }

    fenetreActivation(chiffre): any {
      this.fenetreInfo= false;
      this.fenetreMessage=false;
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
          this.fenetreMessage = false;
  
          break;
        }
        case 2: {
          //modification du profil
          this.fenetreInfo = false;
          this.fenetreModification = true;
          this.fenetreAvis = false;
          this.fenetreMessage = false;
          break;
        }
        case 3: {
          // Card avis
          this.fenetreInfo = false;
          this.fenetreModification = false;
          this.fenetreAvis = true;
          this.fenetreMessage = false;
          break;
        }
        case 4: {
          // Card messages
          this.fenetreInfo = false;
          this.fenetreModification = false;
          this.fenetreAvis = false;
          this.fenetreMessage = true;
          break;
        }
        default: {
          break;
        }
      }}


    submitInfo(user){
      
      console.log("submit");
      this.http.put('http://localhost:8086/user/modifier', user).subscribe({
        next: (data)=> {localStorage.setItem("login", user.login);localStorage.setItem("activity", this.activity); localStorage.setItem("mail", user.mail); localStorage.setItem("password", user.password); localStorage.setItem("tel", user.tel);this.ngOnInit();  
            },
        error: (err) => {console.log(err);}
      });
  
    }


    getAllAvis() {
      console.log('En cours de suppression'),
      this.http.get('http://localhost:8086/avis/user/' + this.id).subscribe({
        next: (data) => { this.avis = data; },
        error: (err) => { console.log(err); }
      });
    }


    deleteAvis(avis){
      console.log(avis.id),
        this.http.delete('http://localhost:8086/avis/delete/'+ avis.id, avis).subscribe({
          next: (data) => {this.ngOnInit(); return confirm('Avis effacé');},
          error: (err) => {
            console.log(err);
          },
        });
      }
      getAllMessage() {
        console.log('En cours de suppression'),
        this.http.get('http://localhost:8086/messages/expediteur/' + this.id).subscribe({
          next: (data) => { this.message = data; },
          error: (err) => { console.log(err); }
        });
      }


      deleteMessage(message){
        console.log(message.id),
          this.http.delete('http://localhost:8086/message/'+ message.id, message).subscribe({
            next: (data) => {this.ngOnInit(); return confirm('Message effacé');},
            error: (err) => {
              console.log(err);
            },
          });
        }
  }
