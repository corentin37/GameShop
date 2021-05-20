import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-ajouter-salle',
  templateUrl: './ajouter-salle.component.html',
  styleUrls: ['./ajouter-salle.component.css']
})
export class AjouterSalleComponent implements OnInit {

  constructor(private http: HttpClient) { }
  salleAjoutee;
  message;
  ngOnInit(): void {
  }

  ajouterSalle(salle){
    this.http.post('http://localhost:8086/salle/save', salle).subscribe({
    next: (data) => {console.log(data); 
    this.salleAjoutee=data; },
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
