import { Injectable } from '@angular/core';
import { CompanyInfo } from './companyInfo.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AppStartService {

  msg: string;
  private companyProfile: CompanyInfo;

  constructor(private http: HttpClient, private router: Router,
    private snackBar: MatSnackBar) { }

  saveCompanyInfo(companyData) {
    const companyDetails = new FormData();
    companyDetails.append('companyName',companyData.companyName);
    companyDetails.append('companyAddressInitial',companyData.companyAddressInitial);
    companyDetails.append('companyAddressPart2',companyData.companyAddressPart2);
    companyDetails.append('companyCity',companyData.companyCity);
    companyDetails.append('companyState',companyData.companyState);
    companyDetails.append('companyCountry',companyData.companyCountry);
    companyDetails.append('companyPincode',companyData.companyPincode);
    companyDetails.append('companyGSTN',companyData.companyGSTN);
    companyDetails.append('companyLogo',companyData.companyLogo, companyData.companyName);
    this.http.post<{ message: string, result: object }>('http://localhost:3000/api/company/addCompanyInfo', companyDetails)
      .subscribe(response => {
        this.snackBar.open(response.message, null, { duration: 3000 });
        localStorage.setItem('firstLogin', 'false');
      },
        (error) => {
          this.msg = error.error.message;
          if (this.msg === undefined) {
            this.msg = error.message;
          }
          this.snackBar.open(this.msg, null, { duration: 3000 });
        });
  }

  getCompanyProfile() {
    return this.http.get<{_id: string, companyName: string, companyAddressInitial: string, companyAddressPart2: string,
      companyCity: string, companyState: string, companyCountry: string, companyPincode: string,
      companyGSTN: string, companyLogoPath: string}>('http://localhost:3000/api/company/getCompanyProfile');
  }

  updateCompanyProfile(CompanyId: string, companyData, companyLogo: File | string) {
    let companyDetails : CompanyInfo | FormData;
    if(typeof companyLogo === 'object') {
    companyDetails = new FormData();
    companyDetails.append('companyName',companyData.CompanyName);
    companyDetails.append('companyAddressInitial',companyData.CompanyAddressInitial);
    companyDetails.append('companyAddressPart2',companyData.CompanyAddressPart2);
    companyDetails.append('companyCity',companyData.CompanyCity);
    companyDetails.append('companyState',companyData.CompanyState);
    companyDetails.append('companyCountry',companyData.CompanyCountry);
    companyDetails.append('companyPincode',companyData.CompanyPincode);
    companyDetails.append('companyGSTN',companyData.CompanyGSTN);
    companyDetails.append('companyLogo',companyData.CompanyLogo, companyData.CompanyName);
    } else {
      companyDetails =  {
        companyName : companyData.CompanyName,
        companyAddressInitial : companyData.CompanyAddressInitial,
        companyAddressPart2: companyData.CompanyAddressPart2,
        companyCity: companyData.CompanyCity,
        companyState: companyData.CompanyState,
        companyCountry: companyData.CompanyCountry,
        companyPincode: companyData.CompanyPincode,
        companyGSTN: companyData.CompanyGSTN,
        companyLogoPath: companyLogo
      }
    }

    this.http.put<{message: string}>('http://localhost:3000/api/company/updateCompanyProfile/' + CompanyId, companyDetails)
      .subscribe(response => {
        this.snackBar.open(response.message, null, {duration: 3000});
      },
      error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      });
  }
}
