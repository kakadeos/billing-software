import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-pending-list',
  templateUrl: './view-pending-list.component.html',
  styleUrls: ['./view-pending-list.component.css']
})
export class ViewPendingListComponent implements OnInit {

  search = '';

  listOfEmails: {};
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any)
  {
  }

  ngOnInit() {
    console.log(this.passedData.emailList);
  }
}
