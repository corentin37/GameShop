import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-salles',
  templateUrl: './gestion-salles.component.html',
  styleUrls: ['./gestion-salles.component.css']
})
export class GestionSallesComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllSalles();
  }

  salle;
  place;
  reserver(s){
    alert("Votre demande de réservation est en cours. Elle sera validée par un responsable dans les prochains jours.");
    this.placeReservee(s);
  }

  placeReservee(salleModifiee){
    this.http.put('http://localhost:8086/salle', salleModifiee).subscribe({
      next: (data) => {console.log(data); this.route.navigateByUrl('salle');},
      error: (err) => {console.log(err); }
    });
  }

  getAllSalles(){
    this.http.get('http://localhost:8086/salle/list').subscribe({
      next: (data) => {console.log(data); this.salle = data;},
      error: (err) => {console.log(err); }
    });
  }

}
