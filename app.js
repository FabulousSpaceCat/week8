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
let update = "UPDATE users SET ?? = ?? + 1 WHERE user_name = ?"
let select = "SELECT ?? FROM users WHERE user_name = ?"
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
                                                "ties with",
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
    let u = "INSERT IGNORE INTO users (user_name) VALUES (?)";
    connection.query(u, user, (err, results) => {
        if(err) throw err; 
    });
    res.redirect("/choose");
});

app.get("/choose", function(req, res){
    // Clear variables just in case
    p1 = "";
    p2 = "";
    left = "";
    middle = "";
    right = "";
    message = "";
    // Get wins
    connection.query(select, ["win", user], (err, results) => {
        if(err) throw err;
        win = results[0].win; 
        // Get losses
        connection.query(select, ["lose", user], (err, results) => {
            if(err) throw err;
            lose = results[0].lose; 
            // Build the page
            res.render("choose", {user, win, lose});
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
    let battle = (9 + p2 - p1) % 9;
    // Special trout rules
    // Trout marriage
    if (p1 === 9 && p2 === p1) {
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
        // Build the page
        res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });

    }
    // Trout smack (50/50)
    else if (p1 === 9 && p1 != p2 && random <5 || p2 === 9 && p1 != p2 && random < 5) {
        middle = weapons[p1].Damage[p2];
        message = "You lose!";
        // Update score
        connection.query(update, ["lose", "lose", user], (err, results) => {
            if(err) throw err;
            // Get score
            connection.query(select, ["lose", user], (err, results) => {
                if(err) throw err;
                lose = results[0].lose; 
                // Build the page
                res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });
            });
        });
    }
    else if (p1 === 9 && p1 != p2 && random >= 5 || p2 === 9 && p1 != p2 && random >= 5) {
        middle = weapons[p1].Damage[p2];
        message = "You win!";
        // Update score
        connection.query(update, ["win", "win", user], (err, results) => {
            if(err) throw err;
            // Get score
            connection.query(select, ["win", user], (err, results) => {
                if(err) throw err;
                win = results[0].win; 
                // Build the page
                res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });
            });
        });
    }
    // Regular rules
    else if (p1 !=9 && p2 !=9 && battle === 0) {
        // Tie
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
         // Build the page
        res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 1){
        // P1 wins
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
        message = "You win!"
        // Update score
        connection.query(update, ["win", "win", user], (err, results) => {
            if(err) throw err;
            // Get score
            connection.query(select, ["win", user], function(err, results){
                if(err) throw err;
                win = results[0].win; 
                // Build the page
                res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });
            });
        });
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 0) {
        // P2 wins
        left = weapons[p1].Name;
        middle = weapons[p1].Damage[p2];
        right = weapons[p2].Name;
        message = "You lose."
        //Update score
        connection.query(update, ["lose", "lose", user], (err, results) => {
            if(err) throw err;
            //Get score
            connection.query(select, ["lose", user], function(err, results){
                if(err) throw err;
                lose = results[0].lose; 
                // Build the page
                res.render("battle", { user, win, lose, left, middle, right, message, p1, p2 });
            });
        });
    }
});

app.listen(6969, function(){
    console.log("Server running on 6969!");
});