import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-ajouter-salle',
  templateUrl: './ajouter-salle.component.html',
  styleUrls: ['./ajouter-salle.component.css']
})
export class AjouterSalleComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private deployService: DepService) { }
  salleAjoutee;
  message;
  ngOnInit(): void {
  }

  ajouterSalle(salle){
    this.http.post(this.deployService.lienHttp + 'salle/save', salle).subscribe({
    next: (data) => {console.log(data); 
    this.salleAjoutee=data;
    },
    error: (err) => {console.log(err);
    }
    });
  }

  messageAjout(): any{
    if(this.salleAjoutee!=null){
      this.message="Salle ajoutée."
    }else{
      this.message=""
    }
    return this.message;
  }
}
