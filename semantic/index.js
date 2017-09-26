var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.80",
  user: "root",
  password: "root@123",
  database: "mydb"
});

con.connect( (err) => {
  if (err) throw err;
  console.log("Connected!");
  /*
  let sql = "CREATE DATABASE mydb";
  let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  let sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  let sql = "INSERT INTO customers (name, address) VALUES ?";
  let values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
  */
  var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  con.query(sql, /*[values],*/ (err, result) => {
    if (err) throw err;
    //console.log("created db!");
    //console.log('Table created');
    //console.log('Table altered');
    //console.log("1 record inserted");
    //console.log("Number of records inserted: " + result.affectedRows);
    console.log("1 record inserted, ID: " + result.insertId);
  });
});