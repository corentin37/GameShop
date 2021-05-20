import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  categorie;
  marque;
  ageMin;
  prixMin;
  prixMax;
  nombreJoueursMin;
  nombreJoueursMax;
  tempsJeuMin;
  tempsJeuMax;
  niveauDifficulte;
  constructor() { }
}
