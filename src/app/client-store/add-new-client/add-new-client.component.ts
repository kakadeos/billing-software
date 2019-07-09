import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientManagementService } from '../ClientManagement.service';
import { Client } from '../Client.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnInit {

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

  constructor(private clientService: ClientManagementService) { }

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
  }



  addNewClient() {
    this.clientService.AddNewClient(this.form.value.CompanyName,this.form.value.CompanyAddressInitial,
      this.form.value.CompanyAddressPart2,this.form.value.CompanyCity,this.form.value.CompanyState,
      this.form.value.CompanyCountry,this.form.value.CompanyPincode,this.form.value.CompanyGSTN
       );
  }

  ViewMyClients() {
    this.clientService.getClientList();
  }
}
