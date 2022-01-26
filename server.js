// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var body = require('body-parser');
app.use(body.urlencoded({extended: false}));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req,res){
  let re1 = /^\d+$/g;
  let str = req.params.date;
  console.log(str);
  if(str===undefined){
    let date = new Date();
    res.json({unix:date.getTime(),utc:date.toUTCString()});
  }
  else if(re1.test(str)){
    let unix = parseInt(str);
    let date = new Date(unix);
    res.json({unix,utc:date.toUTCString()});
  }
  else {
    let arr = str.split(/-/);
    let date = new Date(str);
    if(date.toString()==='Invalid Date')
    res.json({error:"Invalid Date"});
    else res.json({unix:date.getTime(),utc:date.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
