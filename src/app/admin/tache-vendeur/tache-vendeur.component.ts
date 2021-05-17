import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-vendeur',
  templateUrl: './tache-vendeur.component.html',
  styleUrls: ['./tache-vendeur.component.css']
})
export class TacheVendeurComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }


  inscriptionVendeur(personCreated): any{
    // le formulaire s'appelle user, mais creation de vendeur
        // ATTENTION A L'URL
    this.http.post('http://localhost:8086/vendeur/save', personCreated).subscribe({
      next: (data) => {alert('Création du compte admin' ); },
      error : (err) => { console.log(err); }

    });
  }

}
