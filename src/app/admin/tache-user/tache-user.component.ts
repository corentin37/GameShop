import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-user',
  templateUrl: './tache-user.component.html',
  styleUrls: ['./tache-user.component.css']
})
export class TacheUserComponent implements OnInit {

  users;
  rechercheU;
  userExist;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllUser();
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

  inscriptionUser(personCreated): any{
    // le formulaire s'appelle user, mais creation de vendeur
        // ATTENTION A L'URL
    this.http.post('http://localhost:8086/user/save', personCreated).subscribe({
      next: (data) => {alert('Création du compte admin' ); },
      error : (err) => { console.log(err); }

    });
  }

  actvitityBoolToStr(bool): string {
    if (bool === false) {
      return 'Compte bloqué';
    } else {
      return 'Compte débloqué';
    }
  }

  rechercheUser(recherche): any {
    
    this.http
      .post('http://localhost:8086/user/recherche', recherche)
      .subscribe({
        next: (data) => {
          this.rechercheU = data;
          this.isUserExist();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /*
  rechercheUser(recherche): any {
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
*/
  isUserExist(): any {
    if (this.rechercheU != null) {
      this.userExist = true;
    } else {
      this.userExist = false;
    }

    console.log(this.userExist);
  }

  bloquer(vendeur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/user/bloquer', vendeur).subscribe({
      next: (data) => {
        
        this.rechercheU = data;
        this.getAllUser();
        // this.ngOnInit();
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
