import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-vendeur',
  templateUrl: './tache-vendeur.component.html',
  styleUrls: ['./tache-vendeur.component.css']
})
export class TacheVendeurComponent implements OnInit {
  rechercheV; vendeurExist; users;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.isVendeurExist();
  }


  inscriptionVendeur(personCreated): any{
    // le formulaire s'appelle user, mais creation de vendeur
        // ATTENTION A L'URL
    this.http.post('http://localhost:8086/vendeur/save', personCreated).subscribe({
      next: (data) => {alert('Création du compte admin' ); },
      error : (err) => { console.log(err); }

    });
  }

  rechercheVendeur(recherche): any {
    console.log('je suis dans la recherche du vendeur');
    this.http
      .post('http://localhost:8086/vendeur/recherche', recherche)
      .subscribe({
        next: (data) => {
          console.log('le vendeur', data);
          this.rechercheV = data;
          console.log('recherV', this.rechercheV);
          this.isVendeurExist();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  isVendeurExist(): any {
    if (this.rechercheV != null) {
      this.vendeurExist = true;
    } else {
      this.vendeurExist = false;
    }

    console.log(this.vendeurExist);
  }
  bloquer(vendeur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/vendeur/bloquer', vendeur).subscribe({
      next: (data) => {
        console.log('le vendeur en param', vendeur);
        this.rechercheV = data;
        this.getAllUser();
        // this.ngOnInit();
        console.log('vendeur blocker ou debl...', data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addVendeur(vendeur): any {
    if (vendeur != null) {
      return vendeur;
    } else {
      return 'Pas de vendeur';
    }
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
}
