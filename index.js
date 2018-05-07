"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var dateFormat = require('dateformat');
var http = require('https');

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    console.log('=============' + req.body.result.action)
    switch (req.body.result.action) {
		 case "Adddata":
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				
				var speech =
				req.body.result &&
				req.body.result.action &&
				req.body.result.parameters &&
				req.body.result.parameters['unit-weight-name']
				  ? req.body.result.parameters['unit-weight-name']
				  : "Can you please come again";
			    
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					
					var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
		 			//var quantity = req.body.result.parameters.number+":";
		 
					doc.addRow(1, { PRODUCTNAME: req.body.result.parameters.any,QUANTITY: quantity}, function(err) {
					  if(err) {
						console.log(err);
					  }
				   });
				});
				
                return res.json({
                    speech: "Data has been added",
                    source: 'webhook-echo-one',
				});
			
		break;
    }
});
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
