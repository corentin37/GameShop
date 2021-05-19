import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
 sujets;
 message;
 
 idforum=localStorage.getItem("idforum");
  ngOnInit(): void {
    this.getSujet();
  }
  

  getSujet(): any{
    this.http.get ('http://localhost:8086/forum/sujets').subscribe({
      next: (data)=> {this.sujets = data;console.log(data) },
      error: (err)=> {console.log(err);}
    })
  }
  /*goToMessageByForumId(idforum){
    this.http.get('http://localhost:8086/messages/forum/'+idforum).subscribe({
      next: (data) => {this.message = data; console.log(data); 
        a.forEach(element => {
          
        });
        localStorage.setItem("idforum",getForumId(message))},
      error: (err) => {console.log(err);}
    });
  }*/
  getForumId(forum): any{
    this.http.get ('http://localhost:8086/forum/').subscribe({
      next: (data)=> {this.sujets = data;console.log(data) },
      error: (err)=> {console.log(err);}
    })
  }


  goToQuestions(): any {
    this.route.navigateByUrl('questionLivraison');
  }
}
