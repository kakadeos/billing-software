import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BillingService } from '../billing.service';
import { AppStartService } from 'src/app/app-start/appStart.service';
import { Client } from 'src/app/client-store/Client.module';
import { Subscription, Observable } from 'rxjs';
import { ClientManagementService } from 'src/app/client-store/ClientManagement.service';
import { startWith, map, timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {

  invoiceNumber: string;
  companyName: string;
  companyAddressInitial: string;
  companyAddressPart2: string;
  companyCity: string;
  compnayState: string;
  companyCountry: string;
  companyPincode: string;
  companyGSTN: string;
  toCompanyName: string;
  toCompanyAddressInitial: string;
  toCompanyAddressPart2: string;
  toCompanyCity: string;
  toCompnayState: string;
  toCompanyCountry: string;
  toCompanyPincode: string;
  toCompanyGSTN: string;
  invoiceDate: Date;
  invoiceTerms: string;
  itemList = [];
  itemNumber: number;
  itemName: string;
  itemQty: number;
  itemRate: number;
  itemCost: number;
  itemSubTotalCost: number;
  itemGstValue: number;
  itemCGSTValue: number;
  itemSGSTValue: number;
  itemCGST: number;
  itemSGST: number;
  itemTotalCost: number;
  invoiceNotes: string;
  form: FormGroup;
  footerYear: number;
  options: Client[];
  private clientSub: Subscription;
  myControl: FormControl;
  imageSrc:string;
  filteredOptions: Observable<Client[]>;
  isLoading = true;

  constructor(private billingService: BillingService,
    private appStartService: AppStartService, private clientService: ClientManagementService) { }

  ngOnInit() {
    this.myControl = new FormControl();
    this.form = new FormGroup({
      'InvoiceNumber': new FormControl('Invoice Number', { validators: [Validators.required] }),
      'CompanyName': new FormControl('Enter Company Name', { validators: [Validators.required] }),
      'CompanyAddressInitial': new FormControl('Enter Company Address 1', { validators: [Validators.required] }),
      'CompanyAddressPart2': new FormControl('Enter Company Address 2'),
      'CompanyCity': new FormControl('Enter Company City'),
      'CompanyState': new FormControl('Enter Comapny State'),
      'CompanyCountry': new FormControl('Enter Company Country'),
      'CompanyPincode': new FormControl('Enter Company PinCode'),
      'CompanyGSTN': new FormControl('Enter Company GSTN'),
      'ToCompanyName': new FormControl('Enter Company Name', { validators: [Validators.required] }),
      'ToCompanyAddressInitial': new FormControl('Enter Company Address 1', { validators: [Validators.required] }),
      'ToCompanyAddressPart2': new FormControl('Enter Company Address 2'),
      'ToCompanyCity': new FormControl('Enter Company City'),
      'ToCompanyState': new FormControl('Enter Comapny State'),
      'ToCompanyCountry': new FormControl('Enter Company Country'),
      'ToCompanyPincode': new FormControl('Enter Company PinCode'),
      'ToCompanyGSTN': new FormControl('Enter Company GSTN'),
      'InvoiceDate': new FormControl('Enter Invoice Date'),
      'InvoiceTerms': new FormControl('Enter Invoice Terms'),
      'ItemNumber': new FormControl('Enter Item Number'),
      'ItemName': new FormControl('Enter Item Name'),
      'ItemQty': new FormControl('Enter Item Quantity'),
      'ItemRate': new FormControl('Enter Item Rate'),
      'ItemGSTValue': new FormControl('Enter GST Value'),
      'InvoiceNotes': new FormControl('Enter Invoice Notes')
    });

    this.appStartService.getCompanyProfile().subscribe(companyData => {
      this.form.get('CompanyName').setValue(companyData.companyName);
      this.form.get('CompanyAddressInitial').setValue(companyData.companyAddressInitial);
      this.form.get('CompanyAddressPart2').setValue(companyData.companyAddressPart2);
      this.form.get('CompanyCity').setValue(companyData.companyCity);
      this.form.get('CompanyState').setValue(companyData.companyState);
      this.form.get('CompanyCountry').setValue(companyData.companyCountry);
      this.form.get('CompanyPincode').setValue(companyData.companyPincode);
      this.form.get('CompanyGSTN').setValue(companyData.companyGSTN);
      this.imageSrc = companyData.companyLogoPath;
    })
    this.invoiceNumber = 'INV-0004';
    this.toCompanyName = 'Company Name';
    this.toCompanyAddressInitial = 'Company Address Part1';
    this.toCompanyAddressPart2 = 'Company Address Part2';
    this.toCompanyCity = 'Company City';
    this.toCompnayState = 'Company State';
    this.toCompanyCountry = 'Country';
    this.toCompanyPincode = 'Pincode';
    this.toCompanyGSTN = 'GSTINLLSKAKSKS';
    this.invoiceDate = new Date();
    this.invoiceTerms = 'Terms';
    this.addItem(1, 'WebApp', 1, 18000);
    this.addItem(2, 'WebApp Social Media', 3, 8000);
    this.calculatSubTotalCost();
    this.itemGstValue = 18;
    this.itemCGSTValue = this.itemGstValue / 2;
    this.itemSGSTValue = this.itemGstValue / 2;
    this.calculateGST(this.itemGstValue);
    this.calculateItemTotalCost();
    this.invoiceNotes = 'Notes Added here';
    this.footerYear = new Date().getFullYear();

    this.clientService.getClientList();
    this.clientSub = this.clientService.getClientUpdateListener().subscribe((clients: Client[]) => {
      this.options = clients;
      this.isLoading = false;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.options.slice())
      );
    });
  }

  addItem(itemNumber, itemName, itemQty, itemRate) {
    this.itemCost = itemQty * itemRate;
    var item = { itemNumber: itemNumber, itemName: itemName, itemQty: itemQty, itemRate: itemRate, itemCost: this.itemCost };
    this.itemList.push(item);
    this.form.get('ItemNumber').setValue(null);
    this.form.get('ItemName').setValue(null);
    this.form.get('ItemQty').setValue(null);
    this.form.get('ItemRate').setValue(null);
    this.calculatSubTotalCost();
    this.calculateGST(this.itemGstValue);
  }

  calculatSubTotalCost() {
    var elementAdd = 0;
    for (let index = 0; index < this.itemList.length; index++) {
      elementAdd = elementAdd + this.itemList[index].itemCost;
    }
    this.itemSubTotalCost = elementAdd;
  }

  calculateGST(itemGstValue) {
    var halfGSTValue = itemGstValue / 2;
    this.itemCGSTValue = halfGSTValue;
    this.itemSGSTValue = halfGSTValue;
    var calulateGSTPart1 = (this.itemSubTotalCost * halfGSTValue);
    this.itemCGST = calulateGSTPart1 / 100;
    this.itemSGST = calulateGSTPart1 / 100;
    this.calculateItemTotalCost();
  }

  calculateItemTotalCost() {
    this.itemTotalCost = this.itemSubTotalCost + this.itemCGST + this.itemSGST;
  }

  deleteItem(itemNumber) {
    for (let index = 0; index < this.itemList.length; index++) {
      const element = this.itemList[index];
      if (element.itemNumber == itemNumber) {
        this.itemList.splice(index, 1);
      }
    }
    this.calculatSubTotalCost();
    this.calculateGST(this.itemGstValue);
  }

  generateBill() {
    this.billingService.saveInvoice(this.form.value, this.itemList);
  }

  getClientFields(clientname) {
    const client: Client = this.options.find(v => v.ClientCompanyName === clientname)
    if (client) {
      this.form.get('ToCompanyName').setValue(client.ClientCompanyName);
      this.form.get('ToCompanyAddressInitial').setValue(client.ClientCompanyAddressInitial);
      this.form.get('ToCompanyAddressPart2').setValue(client.ClientCompanyAddressPart2);
      this.form.get('ToCompanyCity').setValue(client.ClientCompanyCity);
      this.form.get('ToCompanyState').setValue(client.ClientCompanyState);
      this.form.get('ToCompanyCountry').setValue(client.ClientCompanyCountry);
      this.form.get('ToCompanyPincode').setValue(client.ClientCompanyPincode);
      this.form.get('ToCompanyGSTN').setValue(client.ClientCompanyGSTN);
    }
  }

  clearClientDetails() {
    this.form.get('ToCompanyName').setValue('Company Name');
      this.form.get('ToCompanyAddressInitial').setValue('Client Company Address Part 1');
      this.form.get('ToCompanyAddressPart2').setValue('Client Company Address Part 2');
      this.form.get('ToCompanyCity').setValue('Company City');
      this.form.get('ToCompanyState').setValue('Company State');
      this.form.get('ToCompanyCountry').setValue('Company Country');
      this.form.get('ToCompanyPincode').setValue('Company Pincode');
      this.form.get('ToCompanyGSTN').setValue('Company GSTN');
  }

  private _filter(value: string): Client[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(client => client.ClientCompanyName.toLowerCase().includes(filterValue));
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
