import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SalleService } from '../Services/salle.service';

@Component({
  selector: 'app-reserver-salle',
  templateUrl: './reserver-salle.component.html',
  styleUrls: ['./reserver-salle.component.css']
})
export class ReserverSalleComponent implements OnInit {

  constructor(private http: HttpClient, private salleService: SalleService) { }
  salle;

  ngOnInit(): void {
    this.salle=this.salleService.room;
  }

  //creer la session avant de pouvoir récupérer le joueur qui réserve
  addHistorique(h){
    this.http.post('http://localhost:8086/salle/historique/id', h).subscribe({
      next: (data) => {console.log(data); },
      error: (err) => {console.log(err); }
    });
  }
}
