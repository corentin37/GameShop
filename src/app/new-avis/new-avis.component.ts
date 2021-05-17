import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-avis',
  templateUrl: './new-avis.component.html',
  styleUrls: ['./new-avis.component.css']
})


export class NewAvisComponent implements OnInit {
avis;
  constructor(private http:HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllAvis();
  }
 
  newAvis(avis): any {
    const user = {id: 17};
    const jeu = {id: 19}
    avis.user = user; // on entre l'expéditeur 1 en dur pour gérer l'envoi du test
    avis.jeu = jeu;
    this.http.post('http://localhost:8086/avis', avis).subscribe({
      next: (data)=> {this.route.navigateByUrl('avis');},
      error: (err) => {console.log(err);}
      
    })

  }

  getAllAvis(){
    this.http.get('http://localhost:8086/avis').subscribe({
      next: (data) => {this.avis = data;},
      error: (err) => {console.log(err);}
    }); 
  }


}
