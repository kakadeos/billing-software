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
      return {
        _id: invoice._id,
        InvoiceNumber: invoice.InvoiceNumber,
        ToCompanyName: invoice.ToCompanyName,
        InvoiceFile: invoice.InvoiceFile,
        InvoiceDate: invoice.InvoiceDate,
        InvoicePaymentStatus: invoice.InvoicePaymentStatus
       };
      });
    }
    )
    )
    .subscribe((TransformedInvoices) => {
       this.invoices = TransformedInvoices;
       this.invoiceUpdated.next([...this.invoices]);
    });
  }

  getInvoiceUpdateListener() {
    return this.invoiceUpdated.asObservable();
  }

  UpdatePaymentStatus(invoice) {
      const invoiceToupdate = invoice;
      var invoicePaymentStatus;
      if(invoice.InvoicePaymentStatus === 'PAID') {
        invoicePaymentStatus = 'UNPAID'
      } else {
        invoicePaymentStatus = 'PAID'
      }
      const paymentStatus = {invoicePaymentStatus:invoicePaymentStatus};
      this.http.put<{message: string}>('http://localhost:3000/api/invoice/updateInvoice/' + invoice._id, paymentStatus)
      .subscribe(response => {
        this.snackBar.open(response.message, null, {duration: 3000});
        const updatedInvoice = [...this.invoices];
        const oldInvoiceIndex = updatedInvoice.findIndex(c => c._id === invoiceToupdate._id);
        updatedInvoice[oldInvoiceIndex] = invoiceToupdate;
        invoiceToupdate.InvoicePaymentStatus = invoicePaymentStatus;
        this.invoices = updatedInvoice;
        this.invoiceUpdated.next([...this.invoices]);
        this.router.navigate(['/viewBills']);
      },
      error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      });
  }

}
