const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CompanyInfo = require('../models/company');
const checkAuth = require('../middleware/check-auth');

router.post('/addCompanyInfo', checkAuth, (req, res, next) => {
  console.log('Request Come ');
  console.log(req.body);

  const companyInfo = new CompanyInfo({
    CompanyName: req.body.companyName,
    CompanyAddressInitial: req.body.companyAddressInitial,
    CompanyAddressPart2: req.body.companyAddressPart2,
    CompanyCity: req.body.companyCity,
    CompanyState: req.body.companyState,
    CompanyCountry: req.body.companyCountry,
    CompanyPincode: req.body.companyPincode,
    CompanyGSTN: req.body.companyGSTN,
    InvoiceCreator: req.userData.userId
  });

  companyInfo.save().then(companyInfoAdded => {
    console.log(req.userData.userId);
    User.findOneAndUpdate({_id: req.userData.userId}, {firstLogin: 'false'}).then(
      response => {
        //res.status(200).json({message: 'Added Company Info Successfully'});
      }
    );
    res.status(200).json({message: 'Added Company Information Successfully'});
}).catch(error=> {
    console.log(error);
      return res.status(401).json({
        message: 'Something Went Wrong.'
      });
  });

});

module.exports = router;
