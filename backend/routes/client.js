const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'backend/clientData');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
    cb(null, name);
  }
});


router.post('/addNewClient', checkAuth, (req, res, next) => {
  //console.log(req.body);
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
    res.status(200).json({message: 'Client Added Successfully', clientId : ClientInfoAdded._id});
}).catch(error=> {
    //console.log(error);
      return res.status(401).json({
        message: 'Something Went Wrong. Please try again after some time.'
      });
  });

});

router.get('/getClients',checkAuth, (req, res, next)=> {
  //console.log(req.userData.userId);
  Client.find({clientCreator:req.userData.userId}).then(documents => {
    //console.log(documents);
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
  //console.log(req.body);
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
  Client.updateOne({_id: req.params.id},clientInfo)
  .then(result=>{
    //console.log(result.nModified);
    if(result.nModified > 0) {
      res.status(200).json({
        message : 'Client updated Successfully.',
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


router.delete('/deleteClient/:id',checkAuth,(req,res,next)=>{
  Client.deleteOne({_id : req.params.id, clientCreator: req.userData.userId})
  .then((result)=>{
    //console.log(result);
    if(result.n > 0) {
      res.status(200).json({
        message : 'Client deleted successfully',
      });
    } else {
      res.status(401).json({
        message : 'Some error occured. Please contact system administrator.',
      });
    }
  },
  error => {
    res.status(400).json({message: 'Something went wrong.', error: error});
  });
});


router.post('/uploadClientExcel', checkAuth, multer({storage: storage}).single('ClientExcelList'), (req,res,next)=>{
  console.log(req.file);
  console.log("Client Excel file come here and store inside clientData Folder");
  res.status(200).json({message:'Data Received Successfully'});
});

router.get('/getClient/:id',checkAuth,(req,res,next)=> {
  Client.findById({_id: req.params.id}).then(client => {
    if(client){
      console.log(client);
      res.status(200).json(client);
    } else {
      res.status(400).json({
        message : 'client Not Found.',
      });
    }
  },
  error => {
    res.status(400).json({message: 'Something went wrong.', error: error});
  });
});


module.exports = router;
