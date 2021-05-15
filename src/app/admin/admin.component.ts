import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user; joueur; admin; vendeur;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getAllUser();
    this.getAllJoueur();
    this.getAllVendeur();
    this.getAllAdmin();
  }
 



  inscriptionVendeur(vendeur): any{
    //le formulaire s'appelle user, mais creation de vendeur
        //ATTENTION A L'URL
    this.http.post('http://localhost:8086/vendeur/save', vendeur).subscribe({
      next: (data) => {this.route.navigateByUrl('admin');  },
      error : (err) => { console.log(err); }

    });
  }

  getAllUser(): any{
    this.http.get('http://localhost:8086/user').subscribe({
      next: (data) => { this.user = data; },
      error: (err) => { console.log(err); }

    });

  }

  getAllJoueur(): any{
    this.http.get('http://localhost:8086/joueur/list').subscribe({
      next: (data) => { this.joueur = data; },
      error: (err) => { console.log(err); }

    });
  }

    getAllVendeur(): any{
      this.http.get('http://localhost:8086/vendeur/list').subscribe({
        next: (data) => { this.vendeur = data; },
        error: (err) => { console.log(err); }
  
      });
  
    }

    getAllAdmin(): any{
      this.http.get('http://localhost:8086/admin/list').subscribe({
        next: (data) => { this.admin = data; },
        error: (err) => { console.log(err); }
  
      });
  
    }

  }



