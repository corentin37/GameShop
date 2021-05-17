import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-admin',
  templateUrl: './tache-admin.component.html',
  styleUrls: ['./tache-admin.component.css']
})
export class TacheAdminComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }



inscriptionAdmin(personCreated): any{
  // le formulaire s'appelle user, mais creation de vendeur
      // ATTENTION A L'URL
  this.http.post('http://localhost:8086/admin/save', personCreated).subscribe({
    next: (data) => {alert('Création du compte admin' ); },
    error : (err) => { console.log(err); }

  });
}

}
