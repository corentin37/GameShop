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

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.getAllAdmin();
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
    return 'Compte bloqué';
  } else {
    return 'Compte débloqué';
  }
}


}
