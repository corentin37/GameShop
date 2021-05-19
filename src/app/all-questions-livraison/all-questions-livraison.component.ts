import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-questions-livraison',
  templateUrl: './all-questions-livraison.component.html',
  styleUrls: ['./all-questions-livraison.component.css']
})
export class AllQuestionsLivraisonComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
message;

  ngOnInit(): void {
    this.getAllMessage();
    
  }
  

  newMessage(msg):any{//note ici est la valeur du formulaire
    const expediteur = {id: 1}; //en dur, en temps normal récupérer id de l'user qui s'est connecté
    msg.expediteur = expediteur;
    this.http.post('http://localhost:8086/message', msg).subscribe ({//note est le request body
    next: (data)=>{this.route.navigateByUrl('questionLivraison');},
    error: (err)=>{console.log(err);}
    });
  }


  
  getAllMessage(): any{
  this.http.get('http://localhost:8086/messages').subscribe({
  next: (data)=> {this.message = data; },
  error: (err)=> {console.log(err);}


  });
}
goToForum() :any{
  this.route.navigateByUrl('forum');
}
}
