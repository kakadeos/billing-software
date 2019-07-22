const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.memoryStorage();

router.post('/smsSend', checkAuth, multer({storage: storage}).single('SmsExcel'), (req,res,next)=>{
  console.log(req.body);
  console.log(req.file);
  res.status(200).json({message:'Data Received Successfully'});
});

module.exports = router;
