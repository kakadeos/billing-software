import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { emailSend } from './emailSend.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EmailService {

  resEmailJson;;
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {}

  sendEmail (EmailIDTo: string, EmailIDCc: string, EmailIDBcc:string, EmailSubject:string,
    EmailContent: string, EmailExcel: File, EmailAttachment: File) {
      const emailData = new FormData();
      emailData.append('EmailIDTo' ,EmailIDTo);
      emailData.append('EmailIDCc' ,EmailIDCc);
      emailData.append('EmailIDBcc' ,EmailIDBcc);
      emailData.append('EmailSubject' ,EmailSubject);
      emailData.append('EmailContent' ,EmailContent);
      emailData.append('EmailExcel', EmailExcel);
      emailData.append('EmailAttachment', EmailAttachment);
      console.log(emailData);
      this.http.post<{message: string}>('http://localhost:3000/api/email/emailSend', emailData)
    .subscribe(response => {
      this.snackBar.open(response.message, null, {duration: 3000});
      this.router.navigate(['/emailSend'])
    });
  }
  private emailList= [];
  private emailsUpdated =  new Subject();

  getPendingEmailJson() {
    return this.http.get<{emailList}>('http://localhost:3000/api/email/getEmailListJson');
  }

}
