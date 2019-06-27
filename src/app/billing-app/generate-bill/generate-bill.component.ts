import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {

  invoiceNumber : string;
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
  invoiceDate : Date;
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
  invoiceNotes : string;
  form : FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
        'InvoiceNumber': new FormControl('Invoice Number', {validators: [Validators.required]}),
        'CompanyName': new FormControl('Enter Company Name', {validators: [Validators.required]}),
        'CompanyAddressInitial': new FormControl('Enter Company Address 1', {validators: [Validators.required]}),
        'CompanyAddressPart2': new FormControl('Enter Company Address 2'),
        'CompanyCity': new FormControl('Enter Company City'),
        'CompanyState': new FormControl('Enter Comapny State'),
        'CompanyCountry': new FormControl('Enter Company Country'),
        'CompanyPincode': new FormControl('Enter Company PinCode'),
        'CompanyGSTN': new FormControl('Enter Company GSTN'),
        'ToCompanyName': new FormControl('Enter Company Name', {validators: [Validators.required]}),
        'ToCompanyAddressInitial': new FormControl('Enter Company Address 1', {validators: [Validators.required]}),
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

    this.invoiceNumber = 'INV-0004';
    this.companyName = 'Evolabs Technology and Solutions LLP';
    this.companyAddressInitial = '7, pitrusmriti, Vikaram Nagar';
    this.companyAddressPart2 = 'Kalwa West';
    this.companyCity = 'Thane';
    this.compnayState = 'Maharashtra';
    this.companyCountry = 'India';
    this.companyPincode = '421605';
    this.companyGSTN = 'GSTIN 27AAHFE3985H1Z3';
    this.toCompanyName = 'Vega Solutions Pvt. Ltd.';
    this.toCompanyAddressInitial = 'Flat No 13, Ground Floor,​​Carol Mansion CHS. Ltd,';
    this.toCompanyAddressPart2 = '35 Sitaldevi, Temple Road, Mahim(W)';
    this.toCompanyCity = 'Mumbai';
    this.toCompnayState = 'Maharashtra';
    this.toCompanyCountry = 'India';
    this.toCompanyPincode = '400016';
    this.toCompanyGSTN = 'GSTIN ​27AAHCM7581Q1ZI';
    this.invoiceDate = new Date();
    this.invoiceTerms = 'Terms';
    this.addItem(1, 'WebApp', 1, 18000);
    //this.addItem(2, 'WebApp Social Media', 3, 8000);
    this.calculatSubTotalCost();
    this.itemGstValue = 18;
    this.itemCGSTValue = this.itemGstValue / 2;
    this.itemSGSTValue = this.itemGstValue /2;
    this.calculateGST(this.itemGstValue);
    this.calculateItemTotalCost();
    this.invoiceNotes = 'Notes Added here';
  }

  addItem(itemNumber, itemName, itemQty, itemRate) {
    this.itemCost = itemQty * itemRate;
    var item = {itemNumber : itemNumber, itemName: itemName, itemQty: itemQty, itemRate: itemRate, itemCost: this.itemCost };
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
    this.itemTotalCost = this.itemSubTotalCost + this.itemCGST + this.itemSGST ;
  }

  generateBill() {
      console.log(this.form);
      console.log(this.itemList);
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
