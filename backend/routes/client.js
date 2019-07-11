const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const checkAuth = require('../middleware/check-auth');

router.post('/addNewClient', checkAuth, (req, res, next) => {
  console.log(req.body);
  const clientInfo = new Client({
    companyName: req.body.ClientCompanyName,
    companyAddressInitial: req.body.ClientCompanyAddressInitial,
    companyAddressPart2: req.body.ClientCompanyAddressPart2,
    companyCity: req.body.ClientCompanyCity,
    companyState: req.body.ClientCompanyState,
    companyCountry: req.body.ClientCompanyCountry,
    companyPincode: req.body.ClientCompanyPincode,
    companyGSTN: req.body.ClientCompanyGSTN,
    clientCreator: req.userData.userId
  });

  clientInfo.save().then(ClientInfoAdded => {
    res.status(200).json({message: 'Client Added Successfully'});
}).catch(error=> {
    console.log(error);
      return res.status(401).json({
        message: 'Something Went Wrong.'
      });
  });

});

router.get('/getClients',checkAuth, (req, res, next)=> {
  Client.find({clientCreator:req.userData.userId}).then(documents => {
      res.status(200).json({
      message : 'Clients fetched successfully.',
      clients : documents
    });
  },
  error => {
    res.status(400).json({message: 'Something went wrong.', error: error});
  });
});

router.put('/updateClient/:id',checkAuth,(req,res,next)=>{
  console.log(req.body);
  const clientInfo = new Client({
    _id : req.body.id,
    companyName: req.body.ClientCompanyName,
    companyAddressInitial: req.body.ClientCompanyAddressInitial,
    companyAddressPart2: req.body.ClientCompanyAddressPart2,
    companyCity: req.body.ClientCompanyCity,
    companyState: req.body.ClientCompanyState,
    companyCountry: req.body.ClientCompanyCountry,
    companyPincode: req.body.ClientCompanyPincode,
    companyGSTN: req.body.ClientCompanyGSTN
  });
  console.log(clientInfo);
  console.log(req.params.id);
  console.log(req.userData.userId);
  Client.updateOne({_id: req.params.id},clientInfo)
  .then(result=>{
    console.log(result.nModified);
    if(result.nModified > 0) {
      res.status(200).json({
        message : 'client updated successfully',
      });
    } else {
      res.status(200).json({
        message : 'Nothing is Updated',
      });
    }
  },
  error => {
    res.status(401).json({message: 'Something went wrong.', error: error});
  });
}
);

module.exports = router;
