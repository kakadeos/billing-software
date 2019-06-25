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
  itemCGST: number;
  itemSGST: number;
  itemTotalCost: number;
  billNotes : string;
  form : FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
        'InvoiceNumber': new FormControl('Enter Invoice Number', {validators: [Validators.required]}),
        'CompanyName': new FormControl('Enter Company Name', {validators: [Validators.required]}),
        'CompanyAddressInitial': new FormControl('Enter Company Address 1', {validators: [Validators.required]}),
        'CompanyAddressPart2': new FormControl(''),
        'CompanyCity': new FormControl(''),
        'CompanyState': new FormControl(''),
        'CompanyCountry': new FormControl(''),
        'CompanyPincode': new FormControl(''),
        'CompanyGSTN': new FormControl(''),
        'ToCompanyName': new FormControl('Enter Company Name', {validators: [Validators.required]}),
        'ToCompanyAddressInitial': new FormControl('Enter Company Address 1', {validators: [Validators.required]}),
        'ToCompanyAddressPart2': new FormControl(''),
        'ToCompanyCity': new FormControl(''),
        'ToCompanyState': new FormControl(''),
        'ToCompanyCountry': new FormControl(''),
        'ToCompanyPincode': new FormControl(''),
        'ToCompanyGSTN': new FormControl(''),
        'InvoiceDate': new FormControl(''),
        'InvoiceTerms': new FormControl(''),
        'ItemNumber': new FormControl(''),
        'ItemName': new FormControl(''),
        'ItemQty': new FormControl(''),
        'ItemRate': new FormControl(''),
        'ItemGSTValue': new FormControl('')
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
    this.addItem(1, 'WebApp', 1, 18000.50);
    this.addItem(2, 'WebApp Social Media', 3, 8000);
    this.calculatSubTotalCost();
    this.itemGstValue = 18;
    this.calculateGST();
    this.calculateItemTotalCost();
    this.billNotes = 'Notes Added here';
  }

  addItem(itemNumber, itemName, itemQty, itemRate) {
    this.itemCost = itemQty * itemRate;
    var item = {itemNumber : itemNumber, itemName: itemName, itemQty: itemQty, itemRate: itemRate, itemCost: this.itemCost };
    this.itemList.push(item);
    console.log(this.itemList);
  }

  calculatSubTotalCost() {
    var elementAdd = 0;
    for (let index = 0; index < this.itemList.length; index++) {
      elementAdd = elementAdd + this.itemList[index].itemCost;
    }
    this.itemSubTotalCost = elementAdd;
  }

  calculateGST() {
    var halfGSTValue = this.itemGstValue / 2;
    console.log(halfGSTValue);
    var calulateGSTPart1 = (this.itemSubTotalCost * halfGSTValue);
    console.log(calulateGSTPart1);
    this.itemCGST = calulateGSTPart1 / 100;
    this.itemSGST = calulateGSTPart1 / 100;
  }

  calculateItemTotalCost() {
    this.itemTotalCost = this.itemSubTotalCost + this.itemCGST + this.itemSGST ;
    console.log(this.itemTotalCost);
  }

  generateBill() {

  }
}
