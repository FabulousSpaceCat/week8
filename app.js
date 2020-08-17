var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

let user = "";
let p1 = "";
let win = "";
let lose = "";
let left = "";
let middle = "";
let right = "";
let message = "";
let weapons = [ { Name: "Rock", Damage: [ "ties with", 
                                        "breaks",
                                        "is caught up by", 
                                        "is immune to", 
                                        "is used by", 
                                        "is unaffected by",
                                        "sinks in",
                                        "is unaffected by",
                                        "is covered by",
                                        "Trout smack!" ] }, 
                    { Name: "Scissors", Damage: [ "are broken by", 
                                                "tie with",
                                                "cut",
                                                "can't cut",
                                                "slice",
                                                "can't affect",
                                                "are washed in",
                                                "are melted by",
                                                "cut",
                                                "Trout smack!" ] },
                    { Name: "Mask", Damage: [ "catches a",
                                            "is cut by",
                                            "ties with",
                                            "filters",
                                            "aren't worn by dumb",
                                            "repels",
                                            "gets soaked by",
                                            "filters smoke from",
                                            "are litigated against on",
                                            "Trout smack!" ] },
                    { Name: "Virus", Damage: [ "can't infect",
                                            "can survive on",
                                            "is filtered by",
                                            "ties with",
                                            "infects",
                                            "is socially distanced by",
                                            "travels in droplets of",
                                            "is sterilized by",
                                            "doesn't care about laws on",
                                            "Trout smack!" ] },
                    { Name: "Human", Damage: [ "builds with",
                                            "is cut by",
                                            "feels they don't need a",
                                            "is infected by",
                                            "ties with",
                                            "breathes",
                                            "drowns in",
                                            "cooks with",
                                            "is bound by laws on",
                                            "Trout smack!" ]},
                    { Name: "Air", Damage: [ "can't affect",
                                            "can't be cut by",
                                            "is filtered by",
                                            "socially distances",
                                            "is breathed by",
                                            "ties with",
                                            "dries",
                                            "is consumed by",
                                            "blows away",
                                            "Trout smack!" ]},
                    { Name: "Water", Damage: [ "covers",
                                            "cleans",
                                            "soaks",
                                            "droplets transport",
                                            "drowns",
                                            "evaporates in",
                                            "ties with",
                                            "puts out",
                                            "floats",
                                            "Trout smack!" ]},
                    { Name: "Fire", Damage: [ "can't burn",
                                            "melts",
                                            "can't get smoke through",
                                            "sterilizes",
                                            "is used by",
                                            "consumes",
                                            "is put out by",
                                            "ties with",
                                            "burns",
                                            "Trout smack!" ]},
                    { Name: "Paper", Damage: [ "covers",
                                            "is cut by",
                                            "has laws about wearing",
                                            "can't stop",
                                            "has laws that bind",
                                            "is blown away by",
                                            "floats on",
                                            "is burned by",
                                            "ties with",
                                            "Trout smack!" ]},
                    { Name: "Trout", Damage: [ "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "Trout smack!",
                                            "marries" ]} ]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'rps9',
    password : 'root'
});

app.get("/", function(req, res){
    // How many people have played?
    let c = "SELECT COUNT(*) AS count FROM users";
    // Get count
    connection.query(c, function(err, results){
        if(err) throw err;
        let count = results[0].count; 
        // Build the page
        res.render("home", {count: count});
    });
});

app.post("/play", function(req, res){
    // Who's playing?
    user = req.body.user.trim();
    // Add user if they don't exist
    let u = `INSERT IGNORE INTO users (user_name) VALUES ("${user}")`;
    connection.query(u, function(err, results){
        if(err) throw err; 
    });
    res.redirect("/choose");
});

app.get("/choose", function(req, res){
    // Find wins from particular user
    let w = `SELECT win FROM users WHERE user_name = "${user}"`;
    // Find losses from particular user
    let l = `SELECT lose FROM users WHERE user_name = "${user}"`;
    // Get wins
    connection.query(w, function(err, results){
        if(err) throw err;
        win = results[0].win; 
        // Get losses
        connection.query(l, function(err, results){
            if(err) throw err;
            lose = results[0].lose; 
            // Build the page
            res.render("choose", {user: user, win: win, lose: lose});
        });
    });
});

app.post("/fight", function(req, res){
    // Get the user's weapon
    p1 = req.body.weapon;
    res.redirect("/battle");
});

app.get("/battle", function(req, res){
    // Get the computer's weapon
    let p2 = Math.round(Math.random() * 10);
    let random = Math.round(Math.random() * 10);
    // Fight!
    let battle = (9 + p1 - p2) % 9;
    // Special trout rules
    // Trout marriage
    if (p1 === 9 && p2 === p1) {
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
    }
    // Trout smack (50/50)
    else if (p1 === 9 && p1 != p2 && random <5 || p2 === 9 && p1 != p2 && random < 5) {
        middle = weapons[p1].Damage[p2];
        message = "You lose!";
        let ul = `UPDATE users SET lose = lose + 1 WHERE user_name = "${user}"`;
        connection.query(ul, function(err, results){
            if(err) throw err;
        });
        let l = `SELECT lose FROM users WHERE user_name = "${user}"`;
        connection.query(l, function(err, results){
            if(err) throw err;
            lose = results[0].lose; 
        });
    }
    else if (p1 === 9 && p1 != p2 && random >= 5 || p2 === 9 && p1 != p2 && random >= 5) {
        middle = weapons[p1].Damage[p2];
        message = "You win!";
        let uw = `UPDATE users SET win = win + 1 WHERE user_name = "${user}"`;
        connection.query(uw, function(err, results){
            if(err) throw err;
        });
        let w = `SELECT win FROM users WHERE user_name = "${user}"`;
        connection.query(w, function(err, results){
            if(err) throw err;
            win = results[0].win; 
        });
    }
    // Regular rules
    else if (p1 !=9 && p2 !=9 && battle === 0) {
        // Tie
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 1){
        // P1 wins
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
        message = "You win!"
        let uw = `UPDATE users SET win = win + 1 WHERE user_name = "${user}"`;
        connection.query(uw, function(err, results){
            if(err) throw err;
        });
        let w = `SELECT win FROM users WHERE user_name = "${user}"`;
        connection.query(w, function(err, results){
            if(err) throw err;
            win = results[0].win; 
        });
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 0) {
        // P2 wins
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
        message = "You lose."
        let ul = `UPDATE users SET lose = lose + 1 WHERE user_name = "${user}"`;
        connection.query(ul, function(err, results){
            if(err) throw err;
        });
        let l = `SELECT lose FROM users WHERE user_name = "${user}"`;
        connection.query(l, function(err, results){
            if(err) throw err;
            lose = results[0].lose; 
        });
    }
    // Build the page
    res.render("battle", { user: user, 
                        win: win, 
                        lose: lose, 
                        left: left, 
                        middle: middle, 
                        right: right, 
                        message: message,
                        p1: p1,
                        p2: p2 
    });
});

app.listen(6969, function(){
    console.log("Server running on 6969!");
});