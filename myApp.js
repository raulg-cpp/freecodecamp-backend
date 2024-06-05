require('dotenv').config()

let express = require('express');
let app = express();

// print string
console.log("hello world");

// set UI
app.get("/", function(req, res) {
    //res.send("Hello Express"); // only one command
    res.sendFile(__dirname + '/views/index.html');
    //res.send( {"message": "Hello json"} );
});

app.use("/public", 
    express.static(__dirname + '/public')
);

// send string [api]
app.get("/json", function(req, res) {
    if( process.env.MESSAGE_STYLE === "uppercase" ) {
        res.send( {"message": "HELLO JSON"} );
    } else {
        res.send( {"message": "Hello json"} );
    }
});


























 module.exports = app;
