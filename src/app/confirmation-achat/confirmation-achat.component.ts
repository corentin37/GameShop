import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../Services/panier.service';

@Component({
  selector: 'app-confirmation-achat',
  templateUrl: './confirmation-achat.component.html',
  styleUrls: ['./confirmation-achat.component.css']
})
export class ConfirmationAchatComponent implements OnInit {

  constructor(private http: HttpClient, private panierService : PanierService) { }

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

}
