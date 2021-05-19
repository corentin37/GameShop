import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  utilisateur;
  connectMessage;
  login;

  ngOnInit(): void {
  }

  connexion(user): any{
    this.http.post('http://localhost:8086/connect', user).subscribe({
      next: (data) => {console.log(data); 
        this.utilisateur=data; 
        console.log("u: "+this.utilisateur);
        if(this.utilisateur!=null){
          this.connectMessage="Connecté";

          localStorage.setItem("id", this.utilisateur.id);
          localStorage.setItem("login", this.utilisateur.login);
          localStorage.setItem("mail", this.utilisateur.mail);
          localStorage.setItem("tel", this.utilisateur.tel);
          localStorage.setItem("activity", this.utilisateur.activity);
          this.login=localStorage.getItem("login");
          console.log("name:"+this.login);
          console.log("enregistrement réussi");         
          this.route.navigateByUrl('catalogue');
        }else{
          this.connectMessage= "Identifiant ou mot de passe incorrect.";
        };
      },
      error : (err) => { console.log(err); }
    }); 
  }

  console(entreeConsole): any{
    console.log("retour:"+entreeConsole); 
  }
  
}


