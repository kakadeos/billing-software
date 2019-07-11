import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
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
  options: Client[];
  private clientSub: Subscription;
  myControl: FormControl;
  newOrEditFlag : boolean;

  constructor(private clientService: ClientManagementService) { }

  @ViewChild(FormGroupDirective, {static:true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
    this.newOrEditFlag = true;
    this.myControl = new FormControl();
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
    this.clientService.getClientList();
    this.clientSub = this.clientService.getClientUpdateListener().subscribe((clients: Client[]) => {
      this.options = clients;
      console.log(this.options);
    });
  }



  addOrUpdateClient() {
    if(this.newOrEditFlag == true) {
      this.clientService.AddNewClient(this.form.value.CompanyName,this.form.value.CompanyAddressInitial,
      this.form.value.CompanyAddressPart2,this.form.value.CompanyCity,this.form.value.CompanyState,
      this.form.value.CompanyCountry,this.form.value.CompanyPincode,this.form.value.CompanyGSTN
      );
    } else {
      const client: Client = this.options.find(v => v.ClientCompanyName === this.form.get('CompanyName').value);
      const companyName = this.form.controls['CompanyName'].value;
      if(client) {
        //console.log(client);
        this.clientService.updateClient(client.id, companyName,this.form.value.CompanyAddressInitial,
          this.form.value.CompanyAddressPart2,this.form.value.CompanyCity,this.form.value.CompanyPincode,
          this.form.value.CompanyState,this.form.value.CompanyCountry,this.form.value.CompanyGSTN);
        this.clearForm();
      }
    }

  }

  ViewMyClients() {
    this.clientService.getClientList();
  }

  getClientFields(clientname) {
    const client: Client = this.options.find(v => v.ClientCompanyName === clientname);
    //console.log(client);
    if (client) {
      this.newOrEditFlag = false;
      this.form.get('CompanyName').setValue(client.ClientCompanyName);
      this.form.get('CompanyName').disable();
      this.form.get('CompanyAddressInitial').setValue(client.ClientCompanyAddressInitial);
      this.form.get('CompanyAddressPart2').setValue(client.ClientCompanyAddressPart2);
      this.form.get('CompanyCity').setValue(client.ClientCompanyCity);
      this.form.get('CompanyState').setValue(client.ClientCompanyState);
      this.form.get('CompanyCountry').setValue(client.ClientCompanyCountry);
      this.form.get('CompanyPincode').setValue(client.ClientCompanyPincode);
      this.form.get('CompanyGSTN').setValue(client.ClientCompanyGSTN);
    }
  }

  clearForm() {
    this.newOrEditFlag = true;
    this.myControl.setValue('');
    this.form.get('CompanyName').enable();
    this.form.reset();
    this.formGroupDirective.resetForm();
  }

}
