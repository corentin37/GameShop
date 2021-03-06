import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../Services/forum.service';

@Component({
  selector: 'app-all-questions-livraison',
  templateUrl: './all-questions-livraison.component.html',
  styleUrls: ['./all-questions-livraison.component.css']
})
export class AllQuestionsLivraisonComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private formService: ForumService) { }
  message;
  login;
  info;
  msg;
  forum;


  ngOnInit(): void {
    this.getAllMessage();
    this.getElementBySubject();
    this.login = localStorage.getItem("id");


  }

  getElementBySubject(): any {
    this.http.get('http://localhost:8086/messages/' + this.formService.subjectForum.sujet).subscribe({
      next: (data) => { this.info = data; console.log(data); },
      error: (err) => { console.log(err); }
    });
  }



  newMessage(msg): any {
    console.log("Message posté! Rafraîchir la page");
    const expediteur = { id: localStorage.getItem("id") };
    const forum = { id: localStorage.getItem("id") };
    //const expediteur = { id: 1 };
    msg.expediteur = expediteur;
    //msg.forum=this.forum.sujet;
    if (!this.login) {
      return confirm('Veuillez vous connecter');
    }
    else {

      this.http.post('http://localhost:8086/message/' + this.formService.subjectForum.id, msg).subscribe({
        next: (data) => { console.log(data); this.ngOnInit(); return confirm('Votre question a bien été prise en compte, un collaborateur y répondra très bientôt !'); },
        error: (err) => { console.log(err); }
      });
    }
  }

  newReponse(idMessage, msg): any {
    console.log("Réponse postée! Rafraîchir la page");
    const expediteur = { id: localStorage.getItem("id") };
    //const expediteur = { id: 5 };
    msg.expediteur = expediteur;
    if (!this.login) {
      return confirm('Veuillez vous connecter');
    }
    else {
      msg.forum = this.formService.subjectForum;
      this.http.post('http://localhost:8086/message/reponse/' + idMessage, msg).subscribe({
        next: (data) => { console.log(data); this.ngOnInit(); return confirm('Votre réponse a bien été ajoutée'); },
        error: (err) => { console.log(err); }
      });
    }
  }

    getAllMessage(): any {
      this.http.get('http://localhost:8086/messages').subscribe({
        next: (data) => { this.message = data; },
        error: (err) => { console.log(err); }
  
  
      });
    }

    
      deleteMessage(message){
        console.log(message.id),
          this.http.delete('http://localhost:8086/message/'+ message.id, message).subscribe({
            next: (data) => {this.ngOnInit(); return confirm('Réponse effacée');},
            error: (err) => {
              console.log(err);
            },
          });
        }







  goToForum(): any {
    this.route.navigateByUrl('forum');
  }


}
