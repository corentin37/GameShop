import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepService } from '../Services/dep.service';


@Component({
  selector: 'app-creer-joueur',
  templateUrl: './creer-joueur.component.html',
  styleUrls: ['./creer-joueur.component.css']
})
export class CreerJoueurComponent implements OnInit {
  baseURL = this.deployService.lienHttp + 'joueur/save';




  constructor(private http: HttpClient, private route: Router, private deployService: DepService) {

  }

  ngOnInit(): void {
  }


  inscription(user): any{
        // le formulaire s'appelle user, mais creation de joueur
        // ATTENTION A L'URL
    console.log(user)
    this.http.post(this.deployService.lienHttp + 'joueur/save', user).subscribe({
      next: (data) => {this.route.navigateByUrl('');  },
      error : (err) => { console.log(err); }

    });
  }



}
