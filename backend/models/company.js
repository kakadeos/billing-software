const mongoose = require('mongoose');

const companyInfoSchema = mongoose.Schema({
  companyName: {type: String, required: true},
  companyAddressInitial: {type: String, required: true},
  companyAddressPart2: {type: String, required: true},
  companyCity: {type: String, required: true},
  companyState: {type: String, required: true},
  companyCountry: {type: String, required: true},
  companyPincode: {type: String, required: true},
  companyGSTN: {type: String, required: true},
  companyCreator: {type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
