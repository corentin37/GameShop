import { Component, OnInit } from '@angular/core';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {

  constructor(private deployService: DepService) { }
  fenetreSalle;

  ngOnInit(): void {
  }


}
