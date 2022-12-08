const express = require('express');
var cors = require('cors')
const app = express();
var axios = require('axios');
const bp = require('body-parser')
var second = require('./2.js');
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

var axios = require('axios');
var second = require('./2.js');
var data = JSON.stringify({
  "numOfDocs": "1",
  "format": "pades",
  "mimetype": "pdf",
  "signatureType": "sign",
  "url": {
    "signDocument": "https://e-racun.herokuapp.com/signDocument?signDocument=",
    "success": "https://e-racun.herokuapp.com/success?successtoken=",
    "error": "https://e-racun.herokuapp.com/error?errortoken="
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



const stepFive = () => {

  config.url = "https://test.epotpis.rdd.hr/api/v1/pades";
  config.method = "patch";
  documents[0]["mimetype"] = "PDF";
  const data = {
    token,
    signatureFormat: "pades",
    "signatureLevel": "lta",
    "tsaAccess": {
      "url": "https://tsa.id.hr/qts",
      "username": "tsa username",
      "password": "tsa pass",
    },
    documents

  };
  config.data = data;

  axios(config)
    .then(function (response) {
      console.log(response)
      // stepFive();

    })
    .catch(function (error) {
      console.log(error);
    });
}

const stepFour = () => {
  config.url = "https://httpbin.org/get";
  config.method = "post";
  documents[0]["mimetype"] = "PDF";
  const data = {
    token,
    documents
  };
  config.data = data;

  axios(config)
    .then(function (response) {
      const res = JSON.parse(JSON.stringify(response.data));
      console.log("4 4 4 4 4 STEP FOUR")
      console.log(res)
      stepFive();

    })
    .catch(function (error) {
      console.log(error);
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

  axios(config)
    .then(function (response) {
      const res = JSON.parse(JSON.stringify(response.data));
      console.log("2 2 2 2 2 2 2 2 2 SECOND CALL RESPONSE")
      console.log(res)
      documents = response.data.documents;
      data
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
      console.log("1 1 1 1 11 1 1 1 1 1 INIT DATA ");
      console.log(res)
      token = res.token;
      verificationCodes = res.verificationCodes[0];
      hasTokenVerification();
    })
    .catch(function (error) {
      // console.log(error);
    });
}


app.post('/signDocument', function (req, res) {
  console.log("RESPONSE FROM SIGN DOCUMENT")
  console.log(req.body)
  res.send('Hello World!')
  res.sendStatus(201);
  console.log("RESPONSE FROM SIGN DOCUMENT - END")

});
app.post('/success', function (req, res) {
  console.log("RESPONSE FROM SUCCESS")

  // stepFour();

  console.log("RESPONSE FROM SUCCESS - END")

});
app.post('/error', function (req, res) {
  console.log("RESPONSE FROM ERROR")
  console.log(req);
  // stepFour();
  console.log("RESPONSE FROM ERROR - END")

});

app.post('/home', function (req, res) {
  console.log("RESPONSE FROM E-POTPIS");

  res.send(`<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

</body>
</html>`);
});


app.get('/home', (req, res) => {
  res
    .status(200)
    .send(`<!DOCTYPE html>
<html>
<body>
<h1>Poslan request</h1>
</body>
</html>`)
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  iniCall();
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


