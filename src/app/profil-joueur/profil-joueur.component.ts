import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-joueur',
  templateUrl: './profil-joueur.component.html',
  styleUrls: ['./profil-joueur.component.css']
})
export class ProfilJoueurComponent implements OnInit {

  constructor() { }
id;
login;
mail;
tel;
activity
  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.login = localStorage.getItem("login")
    this.mail = localStorage.getItem("mail")
    this.tel = localStorage.getItem("tel")
    this.activity = localStorage.getItem("activity")
  }

}
