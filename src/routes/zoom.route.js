'use strict';
const express = require('express');
const router = express.Router();
// const bearer=require('../middleware/bearer');
// const acl = require('../middleware/acl');
const rp = require('request-promise');


const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
  iss: process.env.API_KEY, //your API KEY
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

router.get("/createMeeting", (req, res) => {
 let email = "alaqoulibrahim@gmail.com"; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };
  rp(options) 
    .then(function (response) {
      console.log("response is: ", response);
      res.send("create meeting result: " + JSON.stringify(response));
      // console.log(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });}
);

module.exports = router;
