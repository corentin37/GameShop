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
  prixLocationMin;
  prixLocationMax;
  nombreJoueursMin;
  nombreJoueursMax;
  tempsJeuMin;
  tempsJeuMax;
  niveauDifficulte;
  constructor() { }
}
