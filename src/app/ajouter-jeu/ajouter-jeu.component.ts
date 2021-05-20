import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-jeu',
  templateUrl: './ajouter-jeu.component.html',
  styleUrls: ['./ajouter-jeu.component.css']
})
export class AjouterJeuComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  jeuAjoute;
  message;
  ngOnInit(): void {
  }

  ajouterJeu(jeu){
    this.http.post('http://localhost:8086/jeu/save', jeu).subscribe({
    next: (data) => {console.log(data); 
    this.jeuAjoute=data; },
    error: (err) => {console.log(err);
    }
    });
  }

  messageAjout(): any{
    if(this.jeuAjoute!=null){
      this.message="Jeu ajoutée."
    }else{
      this.message=""
    }
    return this.message;
  }
}
