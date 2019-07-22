const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const fs = require('fs');


var api_key = 'key-425de87d2381d7ee4de94e584666389f';
var domain = 'airlock.in';

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: api_key, domain: domain});

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'backend/emailData');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
    cb(null, name);
  }
});

resJson = {
  'Subject1' : [
    'pratik@gmail.com',
    'varad@gmail.com'
  ],
  'Subject2' : [
    'sammit@gmail.com',
    'omkar@gmail.com',
    'sammit@gmail.com',
    'sammit@gmail.com',
  ],

  'Subject3' : [
    'ptm@gmail.com',
    'mitali@gmail.com'
  ]
};


router.post('/emailSend', checkAuth, multer({storage: storage}).fields([{name:'EmailExcel',maxCount: 1},{name:'EmailAttachment', maxCount: 1}]), (req,res,next)=>{
  console.log('EMail Data come here');
  res.status(200).json({message:'Data Received Successfully'});
});


router.get('/getEmailListJson', checkAuth,  (req,res,next)=>{
    res.status(200).json(resJson);
});
module.exports = router;
