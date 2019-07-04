const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');
const invoiceRoutes = require('./routes/invoice');
const companyInfoRoutes = require('./routes/company');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://omkar:PnLpaxxqMcBzcXwx@projectbilling-2xwu9.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(
  result=> {console.log('MongoDb connect Successfully')}
).catch(
  error => {console.log('Oops! Error occured ' + error);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Auth-Token, X-Requested-with, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/invoice/', invoiceRoutes);
app.use('/api/company/', companyInfoRoutes);


module.exports = app;
