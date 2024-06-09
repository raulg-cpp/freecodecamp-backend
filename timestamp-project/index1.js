// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//--------------------- custom code

app.get( "/api/:date", // parameters embedded in :path
  function( req, res ) {
      let date = req.params.date;
      console.log(date);
      
      //console.log( typeof(date) );
      //console.log( Number(date) );
      let num_date = Number(date); // in milliseconds
      console.log(num_date);

      if( num_date !== NaN ) {
        // output date format
        let num2date = new Date(num_date);
        console.log(num2date);
        let date_utc = num2date.toUTCString();
        console.log(date_utc);

      } else {
        let unix_time = Date.parse(date);
        
        if( unix_time === NaN ) { 
          console.log("bad input");
        
        } else { // proper string
          let date_format = new Date(unix_time);
          console.log(date_format);   
          let date_utc = date_format.toUTCString();
          console.log(date_utc);    
        }
      }

      //let date_now = Date.now();
      //console.log(date_now);
      
      //let date_parse = Date.parse(date);
      //console.log(date_parse);

      //let date_format = new Date(date_parse);
      //console.log(date_format);
      
      //let date_utc = date_format.toUTCString();
      //console.log(date_utc); // desired output

      res.send( {'input': "number"} );
  }
);

//--------------------- boilerplate

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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
