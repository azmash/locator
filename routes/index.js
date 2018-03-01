var express = require('express');
var router = express.Router();
var Geocoder = require('node-geocoder');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function codeAddress(address, res) {
  var a,b;
  var option = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyDd2EiU71bLQZFWy4krjrJX2sI5iPQrHNs',
    formatter: null
  }
  var geocoder = Geocoder(option);
  //geocoder = new google.maps.Geocoder();
  //var address = document.getElementById("my-address").value;
  var longla = new Promise (function(resolve, reject) {
    geocoder.geocode( { 'address': address}, function(err, results) {             
      if (err) {
        reject (err);
      } else {
        resolve (results);
      }
    });
})
longla.then(function(results) {
  a = results[0].latitude;
  b = results[0].longitude;
  console.log(address);
  res.render('index', { address: address, long: a, lat:b })
})
}

router.post('/', function(req, res) {
  console.log(req.body.address);
  var address = req.body.address// 
  codeAddress(address,res);
  console.log(address)
 // res.render('index', { result1 }); // render html nya kalau sudah
 });



module.exports = router;
