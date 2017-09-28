var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.1.80",
    user: "root",
    password: "root@123",
    database: "sanskrit"
  });

con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected to db!");
  });

exports.getmaxims = con.query('SELECT * FROM maxims', (err, rows, fields) => {
  if (err) return err
  return rows[0].solution
 })