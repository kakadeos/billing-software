const express = require('express');
const router = express.Router();

invoices = [
    {InvoiceNumber: 'INV1', InvoiceTo: 'Vega1', InvoiceFile: 'Vega12', InvoiceDate: new Date()},
    {InvoiceNumber: 'INV2', InvoiceTo: 'Vega2', InvoiceFile: 'Vega123', InvoiceDate: new Date()},
    {InvoiceNumber: 'INV3', InvoiceTo: 'Vega3', InvoiceFile: 'Vega11', InvoiceDate: new Date()},
    {InvoiceNumber: 'INV4', InvoiceTo: 'Vega4', InvoiceFile: 'Vega31', InvoiceDate: new Date()},
  ];

router.post('/newInvoice',(req, res, next)=>{
  // console.log(req.body.formData);
  // console.log(req.body.itemtableData);

  res.status(200).json({message: 'Data Received'});
});

router.get('/getInvoices', (req, res, next)=> {
  res.status(200).json({message: 'Data Sent Successfully', invoices: invoices});
});

module.exports = router;
