var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : '',
    database : 'rps9',
    password : ''
});

app.get("/", function(req, res){
    // Who's playing?
    let user = document.getElementById("user").value;
    // How many people have played?
    let c = "SELECT COUNT(*) AS count FROM users";
    // Find wins from particular user
    let w = "SELECT win FROM users ";
    // Find losses from particular user
    let l = "SELECT lose FROM users ";
    // Initialize variables
    let count = "";
    let win = "";
    let lose = "";
    connection.query(c, function(err, results){
        if(err) {
            if (err.code === "not found") {
                // Add user to database
                let add = `INSERT INTO users ${user}`
                connection.query(add, function(err, results){
                    if(err) throw err;
                    console.log(results); 
                });
            }
            else {
                console.log(err);
            }
        };
        count = results[0].count; 
    });
    connection.query(w, function(err, results){
        if(err) throw err;
        win = results[0].win; 
    });
    connection.query(l, function(err, results){
        if(err) throw err;
        lose = results[0].lose; 
    });
    res.render("home", {count: count, win: win, lose: lose});
});
