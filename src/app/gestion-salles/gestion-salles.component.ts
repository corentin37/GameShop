import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
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
    this.placeReservee(s);
    this.salleComplete(s);
  }

  placeReservee(salleModifiee){
    this.http.put('http://localhost:8086/salle', salleModifiee).subscribe({
      next: (data) => {console.log(data); this.route.navigateByUrl('reserverSalle');},
      error: (err) => {console.log(err); }
    });
  }

  getAllSalles(){
    this.http.get('http://localhost:8086/salle/list').subscribe({
      next: (data) => {console.log(data); this.salle = data;},
      error: (err) => {console.log(err); }
    });
  }

  salleComplete(s){
    if(s.nombreDePlace==0){
      s.publique=false; //la salle devient privée quand elle est complète
      this.http.put('http://localhost:8086/salle', s).subscribe({
        next: (data) => {console.log(data); },
        error: (err) => {console.log(err); }
      });
    }
  }

  

}
