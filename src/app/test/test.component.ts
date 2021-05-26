import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.afficherDate();
  }

  afficherDate(){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear() + " " +current_datetime.getHours() + ":" + current_datetime.getMinutes();
    console.log(current_datetime);
    console.log(formatted_date);
  }

}
