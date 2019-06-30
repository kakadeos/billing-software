import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable(
  {providedIn: "root"}
)
export class BillingService {

  msg: string;

  constructor( private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  saveInvoice(itemList1, itemList2) {
    const combineData = {
      formData: itemList1,
      itemtableData: itemList2
    }
    this.http.post<{message:string, result: object}>('http://localhost:3000/api/invoice/newInvoice',combineData)
    .subscribe(response => {
        this.snackBar.open(response.message, null, {duration: 3000});
    },
    (error) => {
      this.msg = error.error.message;
      if (this.msg === undefined) {
        this.msg = error.message;
      }
      this.snackBar.open(this.msg , null, {duration: 3000});
    });
  }
}
