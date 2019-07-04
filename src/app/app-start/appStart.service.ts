import { Injectable } from '@angular/core';
import { CompanyInfo } from './companyInfo.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class AppStartService {

  msg: string;

  constructor(private http: HttpClient, private router: Router,
    private snackBar: MatSnackBar) {}

  saveCompanyInfo(companyData) {
    const companyInfo: CompanyInfo = {
      companyName: companyData.companyName,
      companyAddressInitial: companyData.companyAddressInitial,
      companyAddressPart2: companyData.companyAddressPart2,
      companyCity: companyData.companyCity,
      companyState: companyData.companyState,
      companyCountry: companyData.companyCountry,
      companyPincode: companyData.companyPincode,
      companyGSTN: companyData.companyGSTN
    };
    this.http.post<{message:string, result: object}>('http://localhost:3000/api/company/addCompanyInfo', companyData)
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
