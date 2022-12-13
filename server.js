const express = require('express');
var cors = require('cors')
var axios = require('axios');
const bp = require('body-parser')
var second = require('./2.js');
const app = express();
app.use(cors())
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.set("appSecret", "secretforinvoicingapp")
// app.timeout = 60 * 1000 * 10;

var axios = require('axios');
var second = require('./2.js');
var data = JSON.stringify({
  "numOfDocs": "1",
  "format": "pades",
  "mimetype": "pdf",
  "signatureType": "sign",
  "url": {
    "signDocument": "https://e-racun.herokuapp.com/signDocument",
    "success": "https://e-racun.herokuapp.com/success=",
    "error": "https://e-racun.herokuapp.com/error="
  }
});

var config = {
  method: 'post',
  url: 'https://test.epotpis.rdd.hr/api/v1/transactions/',
  headers: {
    'Authorization': 'Bearer 4239ea25-d9fa-40aa-8e7e-6dba99383fc1',
    'Content-Type': 'application/json',
    'Cookie': 'e0a5d6b5144ef112ecfad01656996c48=2c9180530ff7fc3cccfa146c2bcfbcc3'
  },
  data: data
};


let token;
let verificationCodes;
let documents;
let certificate;
let signedDocumentsResponse;


const stepFour = () => {
  config.url = "https://test.epotpis.rdd.hr/api/v1/pades";
  config.method = "patch";

  const newDocuments = [
    {
      hash: documents[0].hash,
      signedHash: documents[0].signedHash,
      verificationCode: documents[0].verificationCode,
      mimetype: documents[0].mimetype,
    }
  ];


  const data = {
    token,
    documents: signedDocumentsResponse,
    signatureFormat: "pades",
    signatureLevel: "b",
    userCertificate: certificate,
  };

  config.data = data;

  axios(config)
    .then(function (response) {
      const res = JSON.parse(JSON.stringify(response.data));
      console.log("4 4 4 4 4 STEP FOUR")
      console.log(res)
      // stepFive();
    })
    .catch(function (error) {
      const err = JSON.parse(JSON.stringify(error));
      console.log(err);
      console.log("ERRORRRR");
    });
}
///step 3
const patchWithHash = () => {
  config.url = "https://test.epotpis.rdd.hr/api/v1/transactions/hash";
  config.method = "patch";
  const data = {
    token,
    documents
  };
  config.data = data;

  axios(config)
    .then(function (response) {
      const res = JSON.parse(JSON.stringify(response.data));
      console.log("3 3 3 3 3 3 3 THIRD DATA")
      console.log(res)
      // stepFour();

    })
    .catch(function (error) {
      // console.log(error);
    });
}



///// after token and verification code comes 2.nd
const hasTokenVerification = () => {
  const data = second.getData(token, verificationCodes);

  config.data = data;
  config.url = "https://test.epotpis.rdd.hr/api/v1/pades";

  console.log("hasTokenVerification");
  console.log(JSON.stringify(config));
  console.log("hasTokenVerification end");

  axios(config)
    .then(function (response) {
      const res = JSON.parse(JSON.stringify(response.data));
      documents = response.data.documents;
      patchWithHash()
    })
    .catch(function (error) {
    })
}



////init call to get otken and and verification code
const iniCall = () => {
  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      const res = JSON.parse(JSON.stringify(response.data));
      token = res.token;
      verificationCodes = res.verificationCodes[0];
      hasTokenVerification();
    })
    .catch(function (error) {
      // console.log(error);
    });
}



app.get('/potpisaniDokument', function (req, res) {
  return res.status(201).send({
    success: true,
  })
});

app.get('/newDocument', function (req, res) {
  iniCall();
  return res.status(201).send({
    success: true,
  })
  // res.send('Hello World!')
});

app.post('/signDocument', function (req, res) {
  console.log("RESPONSE FROM SIGN DOCUMENT")
  console.log(req.body);
  const response = JSON.parse(JSON.stringify(req.body));
  certificate = response.userCertificate;
  documents = response.documents;
  signedDocumentsResponse = response.documents;
  console.log("RESPONSE FROM SIGN DOCUMENT - END");

  setTimeout(() => {
    stepFour();
  }, 3000)
  return res.status(201).send({
    success: true,
  })
  // res.send('Hello World!')
});
app.post('/success', function (req, res) {
  console.log("RESPONSE FROM SUCCESS")
  console.log(req);
  console.log("RESPONSE FROM SUCCESS - END")
  return res.status(201).send({
    success: true,
  })
  // stepFour();
});
app.post('/error', function (req, res) {
  console.log("RESPONSE FROM ERROR")
  console.log(req);
  console.log("RESPONSE FROM ERROR - END")
  return res.status(201).send({
    success: true,
  })

});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  iniCall();
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


