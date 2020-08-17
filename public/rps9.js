function rps() {
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
    // Get the user's weapon
    let p1 = req.body.weapon;
    // Get the computer's weapon
    let p2 = Math.round(Math.random() * 10);
    let random = Math.round(Math.random() * 10);
    // Fight!
    let battle = (9 + p1 - p2) % 9;
    // Special trout rules
    if (p1 === 9 && p2 === p1) {
        // Trout marriage
        let left = weapons[p1].Name;
        let middle = weapons[p1].Damage[p2];
        let right = weapons[p2].Name;
    }
    // Trout smack (50/50)
    else if (p1 === 9 && p1 != p2 && random <5 || p2 === 9 && p1 != p2 && random < 5) {
        let middle = weapons[p1].Damage[p2];
        // Add one to player losses
    }
    else if (p1 === 9 && p1 != p2 && random >= 5 || p2 === 9 && p1 != p2 && random >= 5) {
        let middle = weapons[p1].Damage[p2];
        // Add one to player wins
    }
    // Regular rules
    else if (p1 !=9 && p2 !=9 && battle === 0) {
        // Tie
        let left = weapons[p1].Name;
        let middle = weapons[p1].Damage[p2];
        let right = weapons[p2].Name;
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 1){
        // P1 wins
        let left = weapons[p1].Name;
        let middle = weapons[p1].Damage[p2];
        let right = weapons[p2].Name;
        let message = "You win!"
        // Add one to player wins
        // use w to get win, win++, insert into update values
    }
    else if (p1 !=9 && p2 !=9 && battle != 0 && battle % 2 === 0) {
        // P2 wins
        let left = weapons[p1].Name;
        let middle = weapons[p1].Damage[p2];
        let right = weapons[p2].Name;
        let message = "You lose."
        // Add one to player losses
        // use l to get lose, lose++, insert into update values
    }
}
