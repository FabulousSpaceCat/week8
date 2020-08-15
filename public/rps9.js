function rps() {
    weapons = ["rock", "scissors", "mask", "virus", "human", "air", "water", "fire", "paper", "trout"]
    // Get the user's weapon
    let weapon = req.body.weapon.value;
    // Get the computer's weapon
    let comp = Math.floor(Math.random() * 10);
    // Fight!
    let battle = (9 + weapon - comp) % 9;
    let outcome = battle % 2;
    if (weapon === 9 && comp === 9) {
        // Trout marriage
    }
    else if (weapon === 9 && comp != 9 || weapon != 9 && comp === 9) {
        // Trout smack (50/50)
    }
    else if (battle === 0) {
        // Tie
    }
    else if (outcome === 1 && outcome != 0) {
        // P1 wins
    }
    else if (outcome === 0 && battle != 0) {
        // P2 wins
    }
}