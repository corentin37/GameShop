import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css'],
})
export class DeconnexionComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router, private authService: AuthService, private deployService: DepService) {}
  message;
  ngOnInit(): void {}

  deconnexion() {
    // vider le localStorage
    this.authService.deconnect();
    localStorage.clear();
    console.log('deconnexion réussie');
    this.ngOnInit();
  }

  goToHome() {
    this.route.navigateByUrl('');
  }

  messageDeconnexion() {
    if (localStorage.getItem('id') === null) {
      this.message = 'Déconnexion réussie.';
    } else {
      this.message = "Nous n'arrivons pas à vous déconnecter...";
    }
  }
}
