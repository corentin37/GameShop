import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panierAchat;
  panierLocation;
  panierSalles;
  prixTotalAchat;
  prixTotalLocation;
  constructor() { }
}
