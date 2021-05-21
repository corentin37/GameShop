import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalleService } from '../Services/salle.service';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-gestion-salles',
  templateUrl: './gestion-salles.component.html',
  styleUrls: ['./gestion-salles.component.css']
})
export class GestionSallesComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private salleService: SalleService, private deployService: DepService) { }

  ngOnInit(): void {
    this.getAllSalles();
  }

  salle;
  place;
  rep;
  reservation;
  color;

  reserver(s){
    this.reservation=true;
    this.salleComplete(s);
    this.sallePrivee(s);
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
    this.http.put(this.deployService.lienHttp + 'salle', salleModifiee).subscribe({
      next: (data) => {console.log(data); 
        this.salleService.room=salleModifiee;
        this.route.navigateByUrl('reserverSalle');
      },
      error: (err) => {console.log(err); }
    });
  }

  

  getAllSalles(){
    this.http.get(this.deployService.lienHttp + 'salle/list').subscribe({
      next: (data) => {console.log(data); this.salle = data; 
        //this.changeBackgroundColor()
      },
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
      return "public";
    }
    else{
      return "privé";
    }
  }
  
/*

*/
changeBackgroundColor(){
  for(let s of this.salle){
    console.log(s.publique);
    
    if(s.publique==false){
      document.getElementById(s.id).style.backgroundColor="#e6e6e6";
      
    }
  }
  
}

}
