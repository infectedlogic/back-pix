var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const https = require('https');
const Payment= require('../models/Payment');
const jwt_decode = require("jwt-decode");
const axios = require('axios');
var nodeBase64 = require('nodejs-base64-converter');
const FormData = require('form-data');


const keyPath = path.resolve(__dirname, 'pixbet-dev.key');
const pemPath = path.resolve(__dirname, 'pixbet-dev.pem');

/* GET home page. */


  router.get('/api/auth/', async (req, res) => {
    try{
    let token = nodeBase64.encode(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`);

    const options = {
      httpsAgent: new https.Agent({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(pemPath),
      }),
      headers: {
        'Authorization': `Basic ${token}`
      }
    };
    let resp = await axios.post(process.env.API_AUTH, {} , options);
    return res.send(200,resp.data)  

  } catch (err) {
    if (err) {
      console.log(err.message);
      return res.send({ message: err.toString(), status: 500 });
    }
  }
  });





  router.post('/api/payment/', async (req, res) => {

try{
    const options = {
      httpsAgent: new https.Agent({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(pemPath),
      }),
      headers: {
        'Authorization': `Bearer ${req.body.token}`
      }
    };
    let data = {
      value: req.body.value,
      webhook_url :"http://localhost:3003/webhook",
  
	buyer: {
	    cpf: req.body.cpf,

	}
    }
    let resp = await axios.post(process.env.API_CREATE_PIX, data , options);
return res.send(201,resp.data)

  } catch (err) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
  }
  });

  router.post('/webhook', function (req, res) {
  decoded=  jwt_decode(req.body.bodyEncrypted);

    Payment.create(
      decoded,
        function (err, payment) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(payment);
        });
});

module.exports = router;
