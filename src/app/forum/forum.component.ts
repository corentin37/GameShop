import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../Services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private formService: ForumService) { }
 sujets;
 message;


 
  ngOnInit(): void {
    this.getSujet();
  }
  

  getSujet(): any{
    this.http.get ('http://localhost:8086/forum/sujets').subscribe({
      next: (data)=> {this.sujets = data;console.log(data) },
      error: (err)=> {console.log(err);}
    })
  }
  goToMessage(sujet){
    this.formService.subjectForum = sujet;
    this.route.navigateByUrl('questionLivraison');
  }
 


  goToQuestions(): any {
    this.route.navigateByUrl('questionLivraison');
  }

 
}
