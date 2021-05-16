import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users; joueurs; admins; vendeurs; rechercheV ; recherche; entreeConsole;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    
    
    this.getAllUser();
    /*
    this.getAllJoueur();
    this.getAllVendeur();
    this.getAllAdmin();
    */
  }
 



  inscriptionVendeur(vendeurs): any{
    //le formulaire s'appelle user, mais creation de vendeur
        //ATTENTION A L'URL
    this.http.post('http://localhost:8086/vendeur/save', vendeurs).subscribe({
      next: (data) => {this.route.navigateByUrl('admin');  },
      error : (err) => { console.log(err); }

    });
  }

  getAllUser(): any{
    this.http.get('http://localhost:8086/user').subscribe({
      next: (data) => { this.users = data; },
      error: (err) => { console.log(err); }

    });

  }

  getAllJoueur(): any{
    this.http.get('http://localhost:8086/joueur/lis').subscribe({
      next: (data) => { this.joueurs = data; },
      error: (err) => { console.log(err); }
    });
  }

    getAllVendeur(): any{
      this.http.get('http://localhost:8086/vendeur/list').subscribe({
        next: (data) => { this.vendeurs = data; },
        error: (err) => { console.log(err); }
      });
    }

    getAllAdmin(): any{
      this.http.get('http://localhost:8086/admin/list').subscribe({
        next: (data) => { this.admins = data; },
        error: (err) => { console.log(err); }
        });
    }

  

    rechercheVendeur(recherche): any{
      
      this.console(recherche);
      this.http.post('http://localhost:8086/vendeur/recherche', recherche).subscribe({
        next: (data) => {  this.recherche = data ; console.log(recherche) ; },
        error: (err) => { console.log(err); }
        });
        this.console("recherche :" + this.recherche);
        this.console("data :" + this.rechercheV);
    }


    console(entreeConsole): any{
        console.log(entreeConsole); }
    

  }



