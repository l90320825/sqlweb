const express = require("express");
const { Router } = require('express');
const MySQLStore = require("express-mysql-session");
const mysql = require("mysql2");
const cors = require('cors');

const bodyParser  = require('body-parser');



const app = express();
const router = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sessions = require("express-session");
const { decodeBase64 } = require("bcryptjs");
const mysqlSessions = require("express-mysql-session")(sessions);

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '63595',
	database: 'gamestore'
};

var sessionStore = new MySQLStore(options);

app.use(sessions({
    key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false 
}));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '63595',
    database: 'gamestore',
    waitForConnections: true,
    connectionLimit: 50,
    debug: false,
  });

  app.all('/get', (req, res) => {
      //res.send(200);
      try{
        pool.promise().query("SELECT * FROM customers").then(([result, fields]) => {
            return res.json({
                customers: result,
            });
        });
        }catch{
            console.log(err);
        }
  });

  app.post('/submit', (req, res) => {
      console.log(req.body);
      const {idCustomer, Name, Address} = req.body;
    //res.send(200);
    try{
      pool.promise().query("INSERT INTO customers (idCustomers,Name,Address) VALUES (?,?,?)", [idCustomer, Name, Address]).then(([result, fields]) => {
          return res.status(200).json('customer.add')
      });
      }catch{
          console.log(err);
      }
});

  app.all("*", (req, res, next) => {
    try{
        pool.promise().query("SELECT * FROM customers").then(([result, fields]) => {
            return res.json({
                customers: result,
            });
        });
        }catch{
            console.log(err);
        }
  });




module.exports = app;