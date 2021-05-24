import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { DepService } from '../Services/dep.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users;
  joueurs;
  admins;
  vendeurs;
  rechercheV;
  rechercheJ;
  recherche;
  entreeConsole;
  vendeurExist;
  userConnected = false;
  userId =  localStorage.getItem('id')
  constructor(private http: HttpClient, private route: Router, private deployService: DepService) {}

  ngOnInit(): void {

    this.getAllUser();
    /*
    this.getAllJoueur();
    this.getAllVendeur();
    this.getAllAdmin();
    */
  }

  

  getAllUser(): any {
    this.http.get(this.deployService.lienHttp + 'user').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  





  // permet de traduire le boolean d'activité en string
  activitee(bool): string {
    if (bool === false) {
      return 'Compte bloqué';
    } else {
      return 'Compte débloqué';
    }
  }

  adhesionString(bool): string {
    if (bool === false) {
      return 'Compte adhérant';
    } else {
      return 'Compte non adhérant';
    }
  }

  adherer(joueur): any {
    // SAUVEGARDER LE USER SINON MODIF PAS PRISE EN COMPTE
    this.http.put(this.deployService.lienHttp + 'joueur/adherer', joueur).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clickFunction(): any {
    alert('clicked me!');
  }

  console(entreeConsole): any {
    console.log(entreeConsole);
  }

  connected(){
    if (this.userId != null){
      return this.userConnected = true;
    } else{
      return this.userConnected = false;
    }

  }
  
}
