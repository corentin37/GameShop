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

 
  
    ngOnInit(): void {
      this.id = localStorage.getItem("id")
      this.login = localStorage.getItem("login")
      this.mail = localStorage.getItem("mail")
      this.tel = localStorage.getItem("tel")
      this.activity = localStorage.getItem("activity")
      this.password = localStorage.getItem("password")
      this.getAllAvis();
    }
  
  
    submitInfo(user){
      this.http.put('http://localhost:8086/user/modif/'+this.id, user, user.password=this.password).subscribe({
        next: (data)=> {localStorage.setItem("login", user.login);localStorage.setItem("activity", this.activity); localStorage.setItem("mail", user.mail); localStorage.setItem("tel", user.tel);this.ngOnInit(); return confirm('Informations du profil modifiées !'); 
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
    

  }
