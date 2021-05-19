import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  message;
  ngOnInit(): void {
  }

  deconnexion(){
    //vider le localStorage
    localStorage.clear();
    console.log("deconnexion réussie");
    
  }

  goToHome(){
    this.route.navigateByUrl('catalogue');
  }

  messageDeconnexion(){
    if(localStorage.getItem("id")=== null){
      this.message ="Déconnexion réussie.";
    }else{
      this.message = "Nous n'arrivons pas à vous déconnecter..."
    }
  }
}
