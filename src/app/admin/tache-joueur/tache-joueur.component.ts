import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-joueur',
  templateUrl: './tache-joueur.component.html',
  styleUrls: ['./tache-joueur.component.css']
})
export class TacheJoueurComponent implements OnInit {
  rechercheJ;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }


  adhesionString(bool): string {
    if (bool === false) {
      return 'Compte adhérant';
    } else {
      return 'Compte non adhérant';
    }
  }

  adherer(joueur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/joueur/adherer', joueur).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  rechercheJoueur(recherche): any {
    this.http.post('http://localhost:8086/joueur/recherche', recherche)
      .subscribe({
        next: (data) => {
          this.rechercheJ = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

}
