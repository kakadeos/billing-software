const express = require('express');
const router = express.Router();

router.post('/newInvoice',(req, res, next)=>{
  console.log(req.body.formData);
  console.log(req.body.itemtableData);

  res.status(200).json({message: 'Data Received'});
});


module.exports = router;
