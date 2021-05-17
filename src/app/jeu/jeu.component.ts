import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
  
})
export class JeuComponent implements OnInit {

  jeux;
  jeu;
  //valeur = ;

  constructor(private http:HttpClient, private route: Router) { }

  ngOnInit(): void {
   this.getAllJeu();
  this.getOneJeu();

  }


  getAllJeu(){
    this.http.get('http://localhost:8086/jeu/list').subscribe({
      next: (data) => {this.jeux = data;},
      error: (err) => {console.log(err);}
    }); 
  }


  getOneJeu(){
    this.http.get('http://localhost:8086/jeu/19').subscribe({//problème : affiher le bon jeu correspondant du catalogue, pas tjrs le 19
      next: (data) => {this.jeu = data;},
      error: (err) => {console.log(err);}
    }); 
  }

  

}
