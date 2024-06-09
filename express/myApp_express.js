// activate environment variables
require('dotenv').config();

// headers
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// print string
console.log("hello world");

// root logger [before all else]
app.use( function(req, res, next) {
    let message = req.method + " " + req.path + " - " + req.ip;
    console.log(message);
    next(); 
});


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

// chained request middleware
app.get('/now', 
    function( req, res, next ) {
        req.time = new Date().toString();
        next();
    },
    function( req, res ) {
        res.send( {'time': req.time} );
    }
);

// echo request

// NOTE: path variabled begin with double dots
// Ex: :variable1 , :value2

app.get( "/:word/echo", // parameters embedded in path
    function( req, res ) {
        let variables = req.params;
        //console.log(variables);
        res.send( {'echo': variables.word} );
    }
);

// name query string
app.get( "/name", 
    function( req, res ) {
        let variables = req.query;
        let name = variables.first + " " + variables.last
        res.send({  
            'name': name
        });
    }
);

// encoded URL data
url_data_func = bodyParser.urlencoded({ extended: false} );

app.use( url_data_func );

// Post handler
app.post( "/name",  
    function( req, res ) {
        let data = req.body;
        //console.log( req.body );
        let name = data.first + " " + data.last; 
        res.send( {'name': name} );        
    }
);


















 module.exports = app;
