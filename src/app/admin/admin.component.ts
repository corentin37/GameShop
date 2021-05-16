import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users; joueurs; admins; vendeurs; rechercheV: any ; recherche; entreeConsole;
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
      
      this.http.post('http://localhost:8086/vendeur/recherche', recherche).subscribe({
        next: (data) => {  this.rechercheV = data ; console.log(data);  },
        error: (err) => { console.log(err); }
        });
        }

    addVendeur(vendeur): any {

          if (vendeur != null) {
            return vendeur.id ;
          } else {
            return 'Pas de vendeur';
          }
      
    }


    // permet de traduire le boolean d'activité en string
    activitee(boolean): string {

      if (boolean === false) {
        return 'Compte bloqué' ;
      } else {
        return 'Compte débloqué';
      }
  
}

    bloquer(vendeur){
      
      this.http.put('http://localhost:8086/vendeur/bloquer/'+ vendeur.id, vendeur).subscribe({
        next: (data) => {console.log(data);  },
        error : (err) => { console.log(err); }
  
      });


    }

    clickFunction() {

      alert("clicked me!");
  
    }


    console(entreeConsole): any{
        console.log(entreeConsole); }
    

  }



