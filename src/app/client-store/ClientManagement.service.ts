import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Client } from './Client.module';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientManagementService {

  msg : string;
  private clients: Client[] = [];
  private clientsUpdated =  new Subject<Client[]>();

  constructor(private http: HttpClient, private router: Router,
    private snackBar: MatSnackBar) {}

    AddNewClient(ClientData) {
      console.log(ClientData);
      const Client: Client = {
        ClientCompanyName: ClientData.CompanyName,
        ClientCompanyAddressInitial: ClientData.CompanyAddressInitial,
        ClientCompanyAddressPart2: ClientData.CompanyAddressPart2,
        ClientCompanyCity: ClientData.CompanyCity,
        ClientCompanyState: ClientData.CompanyState,
        ClientCompanyCountry: ClientData.CompanyCountry,
        ClientCompanyPincode: ClientData.CompanyPincode,
        ClientCompanyGSTN: ClientData.CompanyGSTN
      };
      this.http.post<{ message: string, result: object }>('http://localhost:3000/api/clients/addNewClient', Client)
        .subscribe(response => {
          this.snackBar.open(response.message, null, { duration: 3000 });
        },
          (error) => {
            this.msg = error.error.message;
            if (this.msg === undefined) {
              this.msg = error.message;
            }
            this.snackBar.open(this.msg, null, { duration: 3000 });
          });
    }

    getClientList() {
      this.http.get<{message: string, clients: any}>('http://localhost:3000/api/clients/getClients')
      .pipe(map((clientData) => {
        return clientData.clients.map(client => {
          console.log(client);
         return {
            ClientId : client._id,
            ClientCompanyName: client.companyName,
            ClientCompanyAddressInitial: client.companyAddressInitial,
            ClientCompanyAddressPart2 : client.companyAddressPart2,
            ClientCompanyCity: client.companyCity,
            ClientCompanyPinCode: client.companyPincode,
            ClientCompanyState: client.companyState,
            ClientCompanyCountry: client.companyCountry,
            ClientCompanyGSTN: client.companyGSTN,
            ClientCreator: client.clientCreator
         };
        });
      }))
      .subscribe((TransformedClients) => {
        console.log(TransformedClients);
         this.clients = TransformedClients;
         this.clientsUpdated.next([...this.clients]);
      });
    }

    getClientUpdateListener() {
      return this.clientsUpdated.asObservable();
    }

}
