import { Component, OnInit } from '@angular/core';
import { AppStartService } from '../appStart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyInfo } from '../companyInfo.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  form: FormGroup;
  companyId: string;
  companyName: string;
  companyAddressInitial: string;
  companyAddressPart2: string;
  companyCity: string;
  compnayState: string;
  companyCountry: string;
  companyPincode: string;
  companyGSTN: string;
  CompanyDetails: CompanyInfo;

  constructor(private appStartService: AppStartService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'CompanyName': new FormControl('Enter Company Name', { validators: [Validators.required] }),
      'CompanyAddressInitial': new FormControl('Enter Company Address 1', { validators: [Validators.required] }),
      'CompanyAddressPart2': new FormControl('Enter Company Address 2'),
      'CompanyCity': new FormControl('Enter Company City'),
      'CompanyState': new FormControl('Enter Comapny State'),
      'CompanyCountry': new FormControl('Enter Company Country'),
      'CompanyPincode': new FormControl('Enter Company PinCode'),
      'CompanyGSTN': new FormControl('Enter Company GSTN')
    });
    this.appStartService.getCompanyProfile().subscribe(companyData => {
      console.log(companyData);
      this.companyId = companyData._id;
      this.CompanyDetails = {
        companyName: companyData.companyName, companyAddressInitial: companyData.companyAddressInitial,
        companyAddressPart2: companyData.companyAddressPart2, companyCity: companyData.companyCity,
        companyPincode: companyData.companyPincode, companyState: companyData.companyState, companyCountry: companyData.companyCountry,
        companyGSTN: companyData.companyGSTN
      };
      this.form.get('CompanyName').setValue(this.CompanyDetails.companyName);
      this.form.get('CompanyAddressInitial').setValue(this.CompanyDetails.companyAddressInitial);
      this.form.get('CompanyAddressPart2').setValue(this.CompanyDetails.companyAddressPart2);
      this.form.get('CompanyCity').setValue(this.CompanyDetails.companyCity);
      this.form.get('CompanyState').setValue(this.CompanyDetails.companyState);
      this.form.get('CompanyCountry').setValue(this.CompanyDetails.companyCountry);
      this.form.get('CompanyPincode').setValue(this.CompanyDetails.companyPincode);
      this.form.get('CompanyGSTN').setValue(this.CompanyDetails.companyGSTN);
    });
  }

  editDetails() {
    this.appStartService.updateCompanyProfile(this.companyId, this.form.value);
  }
}

