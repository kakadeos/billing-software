const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  InvoiceNumber: {type: String, required: true},
  CompanyName: {type: String, required: true},
  CompanyAddressInitial: {type: String, required: true},
  CompanyAddressPart2: {type: String, required: true},
  CompanyCity: {type: String, required: true},
  CompanyState: {type: String, required: true},
  CompanyCountry: {type: String, required: true},
  CompanyPincode: {type: Number, required: true},
  CompanyGSTN: {type: String, required: true},
  ToCompanyName: {type: String, required: true},
  ToCompanyAddressInitial: {type: String, required: true},
  ToCompanyAddressPart2: {type: String, required: true},
  ToCompanyCity: {type: String, required: true},
  ToCompanyState: {type: String, required: true},
  ToCompanyCountry: {type: String, required: true},
  ToCompanyPincode: {type: Number, required: true},
  ToCompanyGSTN: {type: String, required: true},
  InvoiceDate: {type: Date, required: true},
  InvoiceTerms: {type: String, required: true},
  ItemGSTValue: {type: String, required: true},
  InvoiceNotes: {type: String, required: true},
  InvoiceFile: {type: String, required: true},
  InvoiceItemData : {type: Array, required: true},
  InvoicePaymentStatus: {type: String, required:true},
  InvoiceCreator: {type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}
});

module.exports = mongoose.model('Invoice', invoiceSchema);
