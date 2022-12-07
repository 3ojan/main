var axios = require('axios');
var second = require('./2.js');
var data = JSON.stringify({
  "numOfDocs": "1",
  "format": "pades",
  "mimetype": "pdf",
  "signatureType": "sign",
  "url": {
    "signDocument": "https://www.strizivojna.hr/potpisDokumenta",
    "success": "https://www.strizivojna.hr/download/?token=",
    "error": "https://www.strizivojna.hr/error?token="
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
      console.log(response)
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
      console.log(response.data)
      stepFour();

    })
    .catch(function (error) {
      // console.log(error);
    });
}



///// after token and verification code comes 2.nd
const hasTokenVerification = () => {
  axios(config)
    .then(function (response) {
      const data = second.getData(token, verificationCodes);
      console.log(data)
      console.log("data******")
      config.data = data;
      config.url = "https://test.epotpis.rdd.hr/api/v1/pades";

      axios(config)
        .then(function (response) {
          documents = response.data.documents;
          patchWithHash()
        })
        .catch(function (error) {
        })

    })
    .catch(function (error) {
      console.log(error);
    });
}



////init call to get otken and and verification code
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