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
app.use('/static', express.static(__dirname + '/static'));

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
    res.render('home')
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

//print all maxims in sanskrit only
app.get('/sansmaxims', (req, res) => {
  con.connect( (err) => {
    //assert.equal(null, err); 
    //if(err) res.render('error_template', { error: err })    
    console.log("Connected to db!");
    con.query('SELECT * FROM maxims', (err, rows, fields) => {
      //assert.equal(null, err); 
    //if(err) res.render('error_template', { error: err })    
      if(rows.length != 0){
        let maxims = JSON.parse(JSON.stringify(rows));
        res.render('sansmaxims', { 'maxims': maxims } );
    }else{
        //data["Data"] = 'No data Found..';
        //res.json(data);
        res.status(500).render('error_template', { error: err });
    }
     });
  });
});

app.get('/addmaxim', (req,res) => {
  res.render('maximpost');
})
//post a maxim
app.post('/addmaxim', (req, res, next) => {
  let maxim = req.body.maxim;
  let meaning = req.body.meaning;
  let context = req.body.context;

  if(maxim == '' || meaning == '' || context == ''){
      next('Please fill all the fields');
  }

  con.connect( (err) => {
    //if(err) res.render('error_template', { error: err })
    console.log('Connected for insert');
    con.query("INSERT INTO maxims (maxim, meaning, context) VALUES ('" + maxim + "', '" + meaning + "', '" + context + "')", (err, result) => {
    //if(err) res.render('error_template', { error: err })
    //assert.equal(null, err);
      console.log("Number of records inserted: " + result.affectedRows);
      //res.send('New maxim added to Database with id = '+result.insertId);
      res.render('thankpage')
    });
  });
});

app.post('/searchmean', (req, res, next) => {
  let search_txt = req.body.searchtext;
  if(search_txt == ''){
    res.send('Please enter a text in search box');
   }
  con.connect( (err) => {
    if(err) res.render('error_template', { error: err })
    console.log('Connected for search');
    con.query("SELECT * FROM maxims where meaning LIKE '%" + search_txt + "%'", (err, rows, fields) => {
    //if(err) res.render('error_template', { error: err })
    //assert.equal(null, err);
    if(rows.length != 0){
      let result = JSON.parse(JSON.stringify(rows));
      res.render('maxims', { 'maxims': result } );
  }else{
      //data["Data"] = 'No data Found..';
      //res.json(data);
      res.status(500).render('error_template', { error: err });
  }
    });
  });
})

app.post('/searchsans', (req, res, next) => {
  let search_txt = req.body.searchtext;
  if(search_txt == ''){
    res.send('Please enter a text in search box');
   }
  con.connect( (err) => {
    if(err) res.render('error_template', { error: err })
    console.log('Connected for search');
    con.query("SELECT * FROM maxims where maxim LIKE '%" + search_txt + "%'", (err, rows, fields) => {
    //if(err) res.render('error_template', { error: err })
    //assert.equal(null, err);
    if(rows.length != 0){
      let result = JSON.parse(JSON.stringify(rows));
      res.render('sansmaxims', { 'maxims': result } );
  }else{
      //data["Data"] = 'No data Found..';
      //res.json(data);
      res.status(500).render('error_template', { error: err });
  }
    });
  });
})


//app.use(errorHandler);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
