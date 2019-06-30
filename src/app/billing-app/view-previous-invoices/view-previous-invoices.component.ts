import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Invoice } from '../invoice.module';
import { BillingService } from '../billing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-previous-invoices',
  templateUrl: './view-previous-invoices.component.html',
  styleUrls: ['./view-previous-invoices.component.css']
})
export class ViewPreviousInvoicesComponent implements OnInit, AfterViewInit {

  displayedColumns = ['InvoiceNumber', 'InvoiceTo', 'InvoiceFile', 'InvoiceDate'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Invoice>();
  private invoiceSub : Subscription;

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getInvoiceList();
    this.invoiceSub = this.billingService.getInvoiceUpdateListener().subscribe((invoices: Invoice[]) => {
      console.log(invoices);
      this.dataSource.data = invoices;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
