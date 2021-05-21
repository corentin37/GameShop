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
  joueurId;
  historique;
  joueur;
  

  ngOnInit(): void {
    this.salle=this.salleService.room;
    this.joueurId=localStorage.getItem("id");
    console.log("la salle:"+this.salle);    
    console.log("l'id du joueur"+this.joueurId);
    this.date("Aujourd'hui");
    
        
  }


ajouterHistorique(salle){
  this.http.post('http://localhost:8086/salle/historique', salle).subscribe({
    next: (data) => {console.log(data);
      alert("Place réservée");
    },
    error: (err) => {console.log(err);
    }
  });
}

date(text){
  if(text==="Aujourd'hui"){
    console.log(Date.now());
  }
}

}
