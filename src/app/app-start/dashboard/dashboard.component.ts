import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentValue = 10500;
  overdueValue = 10020;

  constructor() { }

  ngOnInit() {
  }

}
