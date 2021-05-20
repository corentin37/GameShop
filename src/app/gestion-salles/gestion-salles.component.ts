import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalleService } from '../Services/salle.service';

@Component({
  selector: 'app-gestion-salles',
  templateUrl: './gestion-salles.component.html',
  styleUrls: ['./gestion-salles.component.css']
})
export class GestionSallesComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private salleService: SalleService) { }

  ngOnInit(): void {
    this.getAllSalles();
  }

  salle;
  place;
  rep;
  reservation;

  reserver(s){
    this.reservation=true;
    this.salleComplete(s);
    this.sallePrivee(s);
    console.log(this.reservation);
    if(this.reservation===true){
      this.placeReservee(s);
    }
    else{
      this.salleService.room=s;
    }
  }

  //enlève 1 aux nbr de places dispo
  //enregistre la salle modifiée dans room(service)
  placeReservee(salleModifiee){
    salleModifiee.nombreDePlaces-=1;
    console.log("La salle a maintenant : ");
    console.log(salleModifiee.nombreDePlaces);
    console.log(" places.");
    
    
    this.http.put('http://localhost:8086/salle', salleModifiee).subscribe({
      next: (data) => {console.log(data); 
        this.salleService.room=salleModifiee;
      },
      error: (err) => {console.log(err); }
    });
  }

  getAllSalles(){
    this.http.get('http://localhost:8086/salle/list').subscribe({
      next: (data) => {console.log(data); this.salle = data;},
      error: (err) => {console.log(err); }
    });
  }

//vérifie si la salle est privée ou non
  sallePrivee(s): any{
    if(s.publique===false){
      alert("Vous ne pouvez pas réserver cette salle car elle est privée.");
      this.reservation=false;
      this.route.navigateByUrl('/salle');
    }   
    else{
      this.route.navigateByUrl('reserverSalle');
    }
  }

  //vérifie que la salle n'est pas complète
 salleComplete(s){
   if(s.nombreDePlaces===0){
     this.reservation=false;
     alert("Salle complète. Réservation impossible.");
   }
 }

  convertBoolean(b){
    if(b==true){
      return "Oui";
    }
    else{
      return "Non";
    }
  }
  
  //test : aide pour Corentin
  takeElementOfList(liste): any{
    liste.forEach(element => {
      console.log(element);
      
    });
  }

  getMessageByIdForum(idforum): any{
    this.http.get('http://localhost:8086/forum/messages', idforum).subscribe({
      next: (data) => {console.log(data); },
      error: (err) => {console.log(err); }
    });
  }
}
