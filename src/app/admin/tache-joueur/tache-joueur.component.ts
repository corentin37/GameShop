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
  joueurs;
  joueurExist;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllJoueur ();
  }

  
  getAllJoueur(): any {
    this.http.get('http://localhost:8086/joueur/list').subscribe({
      next: (data) => {
        this.joueurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  adhesionString(bool): string {
    if (bool === false) {
      return 'Compte adhérant';
    } else {
      return 'Compte non adhérant';
    }
  }



  rechercheJoueur(recherche): any {
    this.http.post('http://localhost:8086/joueur/recherche', recherche)
      .subscribe({
        next: (data) => {
          this.rechercheJ = data;
          this.isJoueurExist();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  isJoueurExist(): any {
    if (this.rechercheJ != null) {
      this.joueurExist = true;
    } else {
      this.joueurExist = false;
    }

    console.log(this.joueurExist);
  }

  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Compte bloqué';
    } else {
      return 'Compte débloqué';
    }
  }

  cotisationBoolToStr(bool): string {
    if (bool === false) {
      return 'Compte adhérant';
    } else {
      return 'Compte non adhérant';
    }
  }

  bloquer(joueur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/joueur/bloquer', joueur).subscribe({
      next: (data) => {
                this.rechercheJ = data;
        this.getAllJoueur();
        // this.ngOnInit();
        console.log('vendeur blocker ou debl...', data);
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  console(entreeConsole): any {
    console.log(entreeConsole);
  }

}
