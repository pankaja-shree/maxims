mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.1.80",
    user: "root",
    password: "root@123"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to db!");
  });