import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from 'protractor/built/plugins';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-ajouter-jeu',
  templateUrl: './ajouter-jeu.component.html',
  styleUrls: ['./ajouter-jeu.component.css']
})
export class AjouterJeuComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private deployService: DepService) { }
  jeuAjoute;
  message;
  jeuAchat;
  ngOnInit(): void {
  }

  ajouterJeu(jeu){
    this.http.post(this.deployService.lienHttp + 'jeu/save', jeu).subscribe({
    next: (data) => {console.log(data); 
    this.jeuAjoute=data; },
    error: (err) => {console.log(err);
    }
    });
  }

  /*ajouterJeuAchat(){
    this.jeuAchat=this.jeuAjoute;
    this.jeuAchat+=critere en plus;
  }*/

  messageAjout(): any{
    if(this.jeuAjoute!=null){
      this.message="Jeu ajoutée."
    }else{
      this.message=""
    }
    return this.message;
  }
}
