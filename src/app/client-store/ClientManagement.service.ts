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

    AddNewClient(CompanyName: string, CompanyAddressInitial: string, CompanyAddressPart2: string,
      CompanyCity: string, CompanyPincode: string, CompanyState: string, CompanyCountry: string,
      CompanyGSTN: string) {
      const Client: Client = {
        id: null,
        ClientCompanyName: CompanyName,
        ClientCompanyAddressInitial: CompanyAddressInitial,
        ClientCompanyAddressPart2: CompanyAddressPart2,
        ClientCompanyCity: CompanyCity,
        ClientCompanyState: CompanyState,
        ClientCompanyCountry: CompanyCountry,
        ClientCompanyPincode: CompanyPincode,
        ClientCompanyGSTN: CompanyGSTN
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
            id : client._id,
            ClientCompanyName: client.companyName,
            ClientCompanyAddressInitial: client.companyAddressInitial,
            ClientCompanyAddressPart2 : client.companyAddressPart2,
            ClientCompanyCity: client.companyCity,
            ClientCompanyPincode: client.companyPincode,
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
