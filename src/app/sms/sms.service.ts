import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class SmsService {
  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {}

  smsSend (SmsExcel: File, SmsContent: string) {
      const smsSend = new FormData();
      smsSend.append('SmsExcel' ,SmsExcel);
      smsSend.append('SmsContent', SmsContent);
      console.log(smsSend);
      this.http.post<{message: string}>('http://localhost:3000/api/sms/smsSend', smsSend)
    .subscribe(response => {
      this.snackBar.open(response.message, null, {duration: 3000});
      this.router.navigate(['/sendSMS']);
    })
  }
}
