import { Injectable } from '@angular/core';
import { DepService } from './dep.service';

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
  nomDeJeu;
  constructor(private deployService: DepService) { }
}
