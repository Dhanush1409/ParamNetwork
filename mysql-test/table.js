var mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Dhanush000',
    database:'mydb'
  });
  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });
  
  /*con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) console.log(err);
    console.log("Database created");
  });
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("Table created");
  });
  var insert = "INSERT INTO customers (name, address) VALUES ?";
  var values = [
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
  con.query(insert, [values], function (err, result) {
    if (err) console.log(err);
    console.log("Number of records inserted: " + result.affectedRows);
  });*/
  con.query('select * from customers ',function(err,data){
      if(err) console.log(err);
      data.forEach( (row) => {
        console.log(`${row.name} lives in ${row.address}`);
      });
  })
  con.end(function(err){
      if(err) console.log(err);
  });