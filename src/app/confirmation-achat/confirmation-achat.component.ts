import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from '../Services/panier.service';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-confirmation-achat',
  templateUrl: './confirmation-achat.component.html',
  styleUrls: ['./confirmation-achat.component.css']
})
export class ConfirmationAchatComponent implements OnInit {

  constructor(private http: HttpClient,private route: Router, private panierService : PanierService, private deployService: DepService) { }

  panierAchat;
  panierLocation;
  panierSalles;
  prixTotalAchat;
  prixTotalLocation;

  ngOnInit(): void {
    this.panierAchat=this.panierService.panierAchat;
    this.panierLocation=this.panierService.panierLocation;
    this.panierSalles=this.panierService.panierSalles;
    this.prixTotalAchat=this.panierService.prixTotalAchat;
    this.prixTotalLocation=this.panierService.prixTotalLocation;
  }
  convertBoolean(b){
    if(b==true){
      return "Oui";
    }
    else{
      return "En attente";
    }
  }

  goToCatalogue(){
    this.route.navigateByUrl("/catalogue")
  }
}
