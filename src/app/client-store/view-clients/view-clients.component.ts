import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Client } from '../Client.module';
import { ClientManagementService } from '../ClientManagement.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit {


  displayedColumns = ['CompanyName', 'GSTN', 'Address', 'CompanyCity',
  'CompanyState', 'CompanyCountry', 'Edit', 'Delete'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Client>();
  private clientSub : Subscription;
  color = 'accent';
  checked = false;
  disabled = false;
  isLoading = true;

  constructor(private clientMgmtService : ClientManagementService) { }

  ngOnInit() {
    this.clientMgmtService.getClientList();
    this.clientSub = this.clientMgmtService.getClientUpdateListener().subscribe((clients: Client[]) => {
      console.log(clients);
      this.dataSource.data = clients;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(clientId: string) {
    this.clientMgmtService.deleteClient(clientId);
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
}
