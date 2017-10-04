var express = require('express'),
    engines = require('consolidate'),
    bodyParser = require("body-parser")//,
   // assert = require('assert');,
    //db = require('./db.js')

var mysql = require('mysql');
var http = require('http').Server(app);

var app = express()
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).render('error_template', { error: err });
}
//create mysql db connection
var con = mysql.createConnection({
  host: "192.168.1.80",
  user: "root",
  password: "root@123",
  database: "sanskrit"
});

//home page
app.get('/', (req, res) => {
    res.send('Welcome')
})

//print all maxims
app.get('/maxims', (req, res) => {
  con.connect( (err) => {
    //assert.equal(null, err); 
    //if(err) res.render('error_template', { error: err })    
    console.log("Connected to db!");
  con.query('SELECT * FROM maxims', (err, rows, fields) => {
      //assert.equal(null, err); 
    //if(err) res.render('error_template', { error: err })    
    if(rows.length != 0){
        let maxims = JSON.parse(JSON.stringify(rows));
        res.render('maxims', { 'maxims': maxims } );
  }else{
      //data["Data"] = 'No data Found..';
      //res.json(data);
      res.status(500).render('error_template', { error: err });
  }
     });
  });
});

//post a maxim
app.get('/addmaxim', (req, res, next) => {
  res.render('maximpost');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
