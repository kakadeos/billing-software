import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Invoice } from './invoice.module';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
  {providedIn: "root"}
)
export class BillingService {

  msg: string;

  private invoices: Invoice[] = [];
  private invoiceUpdated =  new Subject<Invoice[]>();

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

  getInvoiceList() {
    this.http.get<{message: string, invoices: Invoice[]}>('http://localhost:3000/api/invoice/getInvoices')
    .pipe(map((invoiceData) => {
      return invoiceData.invoices.map(invoice => {
      console.log(invoice);
      return {
        InvoiceNumber: invoice.InvoiceNumber,
        ToCompanyName: invoice.ToCompanyName,
        InvoiceFile: invoice.InvoiceFile,
        InvoiceDate: invoice.InvoiceDate,
        InvoicePaymentStatus: invoice.InvoicePaymentStatus
       };
      });
    }))
    .subscribe((TransformedInvoices) => {
      console.log(TransformedInvoices);
       this.invoices = TransformedInvoices;
       console.log(this.invoices);
       this.invoiceUpdated.next([...this.invoices]);
    });
  }

  getInvoiceUpdateListener() {
    return this.invoiceUpdated.asObservable();
  }
}
