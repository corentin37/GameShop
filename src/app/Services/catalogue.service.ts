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
  nombreJoueurs;
  tempsJeuMin;
  tempsJeuMax;
  niveauDifficulte;
  constructor() { }
}
