var express = require('express'),
bodyParser = require("body-parser")//,
    //db = require('./db.js')

var mysql = require('mysql');
var http = require('http').Server(app);

var app = express()
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "192.168.1.80",
  user: "root",
  password: "root@123",
  database: "sanskrit"
});

//print all maxims
app.get('/', (req, res) => {
  var data = {
    "Data":""
};
  con.query('SELECT * FROM maxims', (err, rows, fields) => {
    if (err) console.log(err)
    if(rows.length != 0){
      data["Data"] = rows;
      res.json(data);
  }else{
      data["Data"] = 'No data Found..';
      res.json(data);
  }
   })
})

//post a maxim

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
