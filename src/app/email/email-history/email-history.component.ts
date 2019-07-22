import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ViewPendingListComponent } from '../view-pending-list/view-pending-list.component';
import { EmailService } from '../email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-history',
  templateUrl: './email-history.component.html',
  styleUrls: ['./email-history.component.css']
})
export class EmailHistoryComponent implements OnInit {

  EmailJson = {};
  keys = [];
  emailList;
  private dialogRef ;
  private emailListSub: Subscription;

  constructor(private dialog: MatDialog, private emailService: EmailService) { }

  ngOnInit() {
   this.emailService.getPendingEmailJson().subscribe(response=>{
     console.log(response);
     this.EmailJson = response;
     for(var k in this.EmailJson) this.keys.push(k);
   })
  }

  getEmailList(item) {
    var responseList = this.EmailJson[item];
    console.log(responseList);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '600px'
    dialogConfig.data = {emailList : responseList};
    this.dialogRef = this.dialog.open(ViewPendingListComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
      }
    );
  }
}
