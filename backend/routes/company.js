const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CompanyInfo = require('../models/company');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post('/addCompanyInfo',multer({storage : storage}).single("companyLogo"), checkAuth, (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body);
    const companyInfo = new CompanyInfo({
    companyName: req.body.companyName,
    companyAddressInitial: req.body.companyAddressInitial,
    companyAddressPart2: req.body.companyAddressPart2,
    companyCity: req.body.companyCity,
    companyState: req.body.companyState,
    companyCountry: req.body.companyCountry,
    companyPincode: req.body.companyPincode,
    companyGSTN: req.body.companyGSTN,
    companyLogoPath: url + "/images/" + req.file.filename,
    companyCreator: req.userData.userId
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


router.get('/getCompanyProfile',checkAuth, (req, res, next)=> {
  //console.log(req.userData.userId);
  CompanyInfo.findOne({companyCreator:req.userData.userId}).then(CompanyProfile => {
    if(CompanyProfile){
      res.status(200).json(CompanyProfile);
    } else {
      res.status(400).json({
        message : 'Company Details Not Found.',
      });
    }
  },
  error => {
    console.log(error);
    res.status(400).json({message: 'Something went wrong.', error: error});
  });
});

router.put('/updateCompanyProfile/:id',checkAuth, (req,res,next)=>{
  const companyInfo = new CompanyInfo({
    _id: req.params.id,
    companyName: req.body.CompanyName,
    companyAddressInitial: req.body.CompanyAddressInitial,
    companyAddressPart2: req.body.CompanyAddressPart2,
    companyCity: req.body.CompanyCity,
    companyState: req.body.CompanyState,
    companyCountry: req.body.CompanyCountry,
    companyPincode: req.body.CompanyPincode,
    companyGSTN: req.body.CompanyGSTN,
    companyCreator: req.userData.userId
  });
  console.log(req.params.id);
  CompanyInfo.updateOne({_id: req.params.id}, companyInfo)
  .then(result=>{
    if(result.nModified > 0) {
      res.status(200).json({
        message : 'Company Profile updated successfully',
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
});

module.exports = router;
