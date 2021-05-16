import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  jeux = [{image:"assets/img/monopoly.jpg", note: 4.5, marque: 'Hasbro Gaming', nom : 'Monopoly'}, 
  {image:"assets/img/trivial.jpg", note: 4.3, marque: 'Hasbro Gaming', nom: 'Trivial Pursuit'},
  {image:"assets/img/puissance.jpg", note:4.2, marque: 'Hasbro Gaming', nom : 'Puissance 4',}
];

  constructor(private http: HttpClient) { }
  //jeu;
  ngOnInit(): void {
    //this.getCatalogue();
  }
  //getCatalogue() : any{
    /*this.http.get('http://localhost:8086/jeu/list').subscribe({
      next: (data)=> {this.jeu = data; },
      error: (err)=> {console.log(err);}
      
      
      });*/
  
   
    
    }