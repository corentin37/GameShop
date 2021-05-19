import { HttpClient } from '@angular/common/http';
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
  // valeur = ;
  avis;
  avisnew;

  idJeu = 19;


  constructor(private http: HttpClient, private route: Router, private jeuService: JeuService) { }

  ngOnInit(): void {
    // this.getAllJeu();
    this.getAllAvis();
    this.jeu = this.jeuService.game;
    console.log('contenu de jeu venu du service', this.jeu);

  }

  getAllAvis() {
    this.http.get('http://localhost:8086/avis').subscribe({
      next: (data) => { this.avis = data; },
      error: (err) => { console.log(err); }
    });
  }


  newAvis(avis): any {
    // gérer user et jeu avec Service
    console.log('Avis posté! Rafraîchir la page');
    const user = {id : 1};
    avis.user = user;
    avis.jeu = this.jeu.lejeu;
    if (avis.note) {
      this.http.post('http://localhost:8086/avis', avis).subscribe({
        next: (data) => {console.log(data); window.scrollTo(0, 0); this.ngOnInit(); return confirm('Avis posté !'); },
        error: (err) => {console.log(err); }
      });

    }
    else {
      return confirm('Veuillez entrer une note');
   }

  }




}
