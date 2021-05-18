import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { HistoriqueSalleService } from '../Services/historique-salle.service';

@Component({
  selector: 'app-historique-salle',
  templateUrl: './historique-salle.component.html',
  styleUrls: ['./historique-salle.component.css']
})
export class HistoriqueSalleComponent implements OnInit {

  constructor(private http: HttpClient, private historiqueService: HistoriqueSalleService) { }
  historique;

  ngOnInit(): void {
    this.getAllHistorique();
    this.historique=this.historiqueService.history;
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

  validerReservation(h){
    this.http.put('http://localhost:8086/salle/historique/id', h).subscribe({
      next: (data) => {console.log(data);
        this.historique=h; },
      error: (err) => {console.log(err);  }
    });
  }

  
}
