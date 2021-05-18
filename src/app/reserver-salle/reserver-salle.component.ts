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

}
