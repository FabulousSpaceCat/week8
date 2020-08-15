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
    // How many people have played?
    let c = "SELECT COUNT(*) AS count FROM users";
    let count = "";
    // Get count
    connection.query(c, function(err, results){
        if(err) throw err;
        count = results[0].count; 
    });
    // Build the page
    res.render("home", {count: count});
});

app.get("/play", function(req, res){
    // Who's playing?
    let user = req.body.userName;
    // Add/Get user
    let u = `INSERT IGNORE INTO users (user) VALUES ("${user}")`;
    // Find wins from particular user
    let w = `SELECT win FROM users WHERE user = "${user}"`;
    // Find losses from particular user
    let l = `SELECT lose FROM users WHERE user = "${user}"`;
    // Initialize variables
    let win = "";
    let lose = "";
    // Add user if they don't exist
    connection.query(u, function(err, results){
        if(err) throw err; 
    });
    // Get wins
    connection.query(w, function(err, results){
        if(err) throw err;
        win = results[0].win; 
    });
    // Get losses
    connection.query(l, function(err, results){
        if(err) throw err;
        lose = results[0].lose; 
    });
    // Build the page
    res.render("play", {user: user, win: win, lose: lose});
});
