import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet';
  login = localStorage.getItem("login");
  helloMessage;
  userId =  localStorage.getItem('id');
  userConnected;

  ngOnInit(): void {

  }


  deconnexion(){
    //vider le localStorage
    localStorage.removeItem("id");
    localStorage.removeItem("login");
    localStorage.removeItem("mail");
    localStorage.removeItem("tel");
    localStorage.removeItem("activity");
    console.log("deconnexion réussie");
  }

  cacherLogin(b): any{
    if(b===true){
      if(this.login!=null){
        this.helloMessage="Bonjour "+this.login;
      }
      else{
        this.helloMessage="Mon Compte";
      }
    }else{
      this.helloMessage="Mon Compte";
    }
    return this.helloMessage;
    
  }

  connected(){
    if (this.userId != null){
      return this.userConnected = true;
    } else{
      return this.userConnected = false;
    }

  }

  reset(){
    this.ngOnInit;
  }
}
