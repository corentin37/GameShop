import { Component, OnInit } from '@angular/core';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css']
})
export class GestionAdminComponent implements OnInit {

  constructor(private deployService: DepService) { }

  ngOnInit(): void {
  }

}
