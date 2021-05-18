import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-admin',
  templateUrl: './tache-admin.component.html',
  styleUrls: ['./tache-admin.component.css']
})
export class TacheAdminComponent implements OnInit {

admins;
person; // personne recherchée par requet recherche
personExist; adminsExist;


 // creation fenetre
 fenetreCreerActivation; fenetrePersonExistError;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.getAllAdmin();
  }

  recherchePerson(recherche): any {
    this.fenetreCreerActivation = false;
    this.http
      .post('http://localhost:8086/admin/recherche', recherche)
      .subscribe({
        next: (data) => {
          
          this.person = data;
          this.isPersonExist();
        
        },
        error: (err) => {
          console.log(err);
        },
      });

      
  }

  fenetreCreer(): any {
    this.fenetreCreerActivation = true;
    this.fenetrePersonExistError = false;

  }

  isPersonExist(): any {
    if (this.person != null) {
      this.personExist = true;
      this.fenetrePersonExistError = false;
    } else {
      this.personExist = false;
      this.fenetrePersonExistError = true;
    }

    console.log(this.personExist);
  }

  refreshAdmins(): any{
    if(this.person == null)
    {
      this.getAllAdmin();
    } else {
    }
  }

  bloquer(person): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put('http://localhost:8086/admin/bloquer', person).subscribe({
      next: (data) => {

        this.person = data;
        this.getAllAdmin();
        // this.ngOnInit();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

inscriptionAdmin(personCreated): any{
  // le formulaire s'appelle user, mais creation de vendeur
      // ATTENTION A L'URL
  this.http.post('http://localhost:8086/admin/save', personCreated).subscribe({
    next: (data) => {alert('Création du compte admin' ); },
    error : (err) => { console.log(err); }

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

actvitityBoolToStr(bool): string {
  if (bool === false) {
    return 'Bloqué';
  } else {
    return 'Débloqué';
  }
}


}
