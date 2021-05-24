import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privatiser-salle',
  templateUrl: './privatiser-salle.component.html',
  styleUrls: ['./privatiser-salle.component.css']
})
export class PrivatiserSalleComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  listeNom;
  fenetreSalle;
  

  ngOnInit(): void {
    
  }

  modifierSalle(salle){
    this.http.put('http://localhost:8086/salle', salle).subscribe({
      next: (data) => {console.log(data);
      },
      error: (err) => {console.log(err);
      }
    })
  }

  getAllSalle(){
    this.http.get('http://localhost:8086/salle/list').subscribe({
      next: (data) => {console.log(data);
      },
      error: (err) => {console.log(err);
      }
    })
  }

  fenetreActivation(): any {
    this.fenetreSalle = true;
  }
}
