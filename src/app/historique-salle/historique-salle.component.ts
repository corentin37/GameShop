import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique-salle',
  templateUrl: './historique-salle.component.html',
  styleUrls: ['./historique-salle.component.css']
})
export class HistoriqueSalleComponent implements OnInit {

  constructor(private http: HttpClient) { }
  historique;

  ngOnInit(): void {
    this.getAllHistorique();
  }

  getAllHistorique(){
    this.http.get('http://localhost:8086/salle/historique').subscribe({
      next: (data) => {console.log(data); 
      this.historique=data; },
      error: (err) => {console.log(err); }
    });

  }

  convertBoolean(b){
    if(b==true){
      return "Oui";
    }
    else{
      return "Non";
    }
  }
}
