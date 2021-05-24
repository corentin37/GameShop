import { Component, OnInit } from '@angular/core';
import { DepService } from '../../Services/dep.service';

@Component({
  selector: 'app-tache-salle',
  templateUrl: './tache-salle.component.html',
  styleUrls: ['./tache-salle.component.css']
})
export class TacheSalleComponent implements OnInit {

  constructor( private deployService: DepService) { }

  ngOnInit(): void {
  }

}
