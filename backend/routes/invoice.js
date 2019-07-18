const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const checkAuth = require('../middleware/check-auth');

router.post('/newInvoice', checkAuth, (req, res, next) => {
  //console.log(req.body.formData);
  const invoice = new Invoice({
    InvoiceNumber: req.body.formData.InvoiceNumber,
    CompanyName: req.body.formData.CompanyName,
    CompanyAddressInitial: req.body.formData.CompanyAddressInitial,
    CompanyAddressPart2: req.body.formData.CompanyAddressPart2,
    CompanyCity: req.body.formData.CompanyCity,
    CompanyState: req.body.formData.CompanyState,
    CompanyCountry: req.body.formData.CompanyCountry,
    CompanyPincode: req.body.formData.CompanyPincode,
    CompanyGSTN: req.body.formData.CompanyGSTN,
    ToCompanyName: req.body.formData.ToCompanyName,
    ToCompanyAddressInitial: req.body.formData.ToCompanyAddressInitial,
    ToCompanyAddressPart2: req.body.formData.ToCompanyAddressPart2,
    ToCompanyCity: req.body.formData.ToCompanyCity,
    ToCompanyState: req.body.formData.ToCompanyState,
    ToCompanyCountry: req.body.formData.ToCompanyCountry,
    ToCompanyPincode: req.body.formData.ToCompanyPincode,
    ToCompanyGSTN: req.body.formData.ToCompanyGSTN,
    InvoiceDate: req.body.formData.InvoiceDate,
    InvoiceTerms: req.body.formData.InvoiceTerms,
    ItemGSTValue: req.body.formData.ItemGSTValue,
    InvoiceNotes: req.body.formData.InvoiceNotes,
    InvoiceFile: req.body.formData.ToCompanyName + new Date().getMilliseconds(),
    InvoiceItemData: req.body.itemtableData,
    InvoicePaymentStatus: 'UNPAID',
    InvoiceCreator: req.userData.userId
  });

  invoice.save().then(invoiceAdded => {
    res.status(201).json({
      message: 'Invoice Added Successfully',
    });
  });
});

router.get('/getInvoices', checkAuth, (req, res, next) => {
  Invoice.find({
    InvoiceCreator: req.userData.userId
  }).then(documents => {
      res.status(200).json({
        message: 'Invoices fetched successfully.',
        invoices: documents
      });
    },
    error => {
      res.status(400).json({
        message: 'Something went wrong.',
        error: error
      });
    });
});


router.put('/updateInvoice/:id', checkAuth, (req, res, next) => {
  //console.log(req.body);
  Invoice.update({
      _id: req.params.id
    }, {
      InvoicePaymentStatus: req.body.invoicePaymentStatus
    })
    .then(result => {
        //console.log(result.nModified);

        if (result.nModified > 0) {
          res.status(200).json({
            message: 'updated successfully.',
          });
        } else {
          res.status(200).json({
            message: 'Nothing is Updated',
          });
        }
      },
      error => {
        res.status(401).json({
          message: 'Something went wrong.',
          error: error
        });
      });

});


module.exports = router;
