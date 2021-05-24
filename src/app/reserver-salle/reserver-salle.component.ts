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
  historique;
  salle;
  joueurId;
  joueur;
  historiqueEnregistree;

  ngOnInit(): void {
    this.salle=this.salleService.room;
    this.joueurId=localStorage.getItem("id");
    console.log("la salle:"+this.salle);    
    console.log("l'id du joueur"+this.joueurId);    
        
  }


ajouterHistorique(historique){
  this.http.post('http://localhost:8086/salle/historique', historique).subscribe({
    next: (data) => {console.log(data);
      this.historiqueEnregistree=data;
      this.ajouterSalleEtJoueurDansHistorique(this.historiqueEnregistree);
      alert("Place réservée");
    },
    error: (err) => {console.log(err);
    }
  });
}

ajouterSalleEtJoueurDansHistorique(historique){
  var user, id, joueur;
  historique.salle=this.salle;
  id=localStorage.getItem('id');
  if(id!=null){
    //trouver user
    this.http.get('http://localhost:8086/user/id/'+id).subscribe({
      next: (data) => {console.log(data);
        user=data;
        //trouver joueur
        this.http.post('http://localhost:8086/joueur/recherche', user).subscribe({
          next: (data) => {console.log(data);
            joueur=data;
            //ajouter joueur à historique
            historique.joueur=joueur;
            //mettre à jour joueur et salle dans l'historique
            this.http.put('http://localhost:8086/salle/historique/modifier/'+this.historiqueEnregistree.id, historique).subscribe({
              next: (data) => {console.log(data);
      },
      error: (err) => {console.log(err);
      }
    });
      },
      error: (err) => {console.log(err);}
    });
      },
      error: (err) => {console.log(err); }
    });
    
    
  };
  
  
}



}
