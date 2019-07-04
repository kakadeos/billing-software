const mongoose = require('mongoose');

const companyInfoSchema = mongoose.Schema({
  CompanyName: {type: String, required: true},
  CompanyAddressInitial: {type: String, required: true},
  CompanyAddressPart2: {type: String, required: true},
  CompanyCity: {type: String, required: true},
  CompanyState: {type: String, required: true},
  CompanyCountry: {type: String, required: true},
  CompanyPincode: {type: String, required: true},
  CompanyGSTN: {type: String, required: true},
  InvoiceCreator: {type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
