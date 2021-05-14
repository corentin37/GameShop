import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-creer-joueur',
  templateUrl: './creer-joueur.component.html',
  styleUrls: ['./creer-joueur.component.css']
})
export class CreerJoueurComponent implements OnInit {
  baseURL = 'http://localhost:8086/joueur/save';

  user;
  
  
  constructor(private http: HttpClient) {
    
  }








  ngOnInit(): void {
  }
/*
  //WARNING ATTENTION AU NUM DU LOCAL HOST
  inscription(user: User): Observable<User> {

    this.http.post('http://localhost:8086/joueur/save', user).subscribe({
      next: (data) => {console.log(data);  },
      error : (err) => { console.log(err); }
    
    });
  }*/

  inscription(user): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.baseURL , body,{'headers':headers})
  }


}
