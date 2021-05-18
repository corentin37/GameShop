import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users;
  joueurs;
  admins;
  vendeurs;
  rechercheV;
  rechercheJ;
  recherche;
  entreeConsole;
  vendeurExist;
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {

    this.getAllUser();
    /*
    this.getAllJoueur();
    this.getAllVendeur();
    this.getAllAdmin();
    */
  }

  inscriptionVendeur(personCreated): any {
    // le formulaire s'appelle user, mais creation de vendeur
    // ATTENTION A L'URL
    this.http
      .post('http://localhost:8086/vendeur/save', personCreated)
      .subscribe({
        next: (data) => {
          alert('Création du compte vendeur ');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllUser(): any {
    this.http.get('http://localhost:8086/user').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllJoueur(): any {
    this.http.get('http://localhost:8086/joueur/lis').subscribe({
      next: (data) => {
        this.joueurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllVendeur(): any {
    this.http.get('http://localhost:8086/vendeur/list').subscribe({
      next: (data) => {
        this.vendeurs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllAdmin(): any {
    this.http.get('http://localhost:8086/admin/list').subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }





  // permet de traduire le boolean d'activité en string
  activitee(bool): string {
    if (bool === false) {
      return 'Compte bloqué';
    } else {
      return 'Compte débloqué';
    }
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

  clickFunction(): any {
    alert('clicked me!');
  }

  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  
}
