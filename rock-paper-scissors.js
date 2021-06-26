function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            throw "Value does not represent a valid play";
    }
}

function capitalize(string) {
    string = string.toLowerCase();
    let firstChar = string.charAt(0);
    string = string.replace(firstChar, firstChar.toUpperCase());
    return string;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection)
    
    let playerResult;
    switch (true) {
        case !(["Rock", "Paper", "Scissors"].includes(playerSelection)):
            throw "Player move is not valid";
        case playerSelection == "Rock" && computerSelection == "Scissors":
        case playerSelection == "Scissors" && computerSelection == "Paper":
        case playerSelection == "Paper" && computerSelection == "Rock":
            playerResult = "win";
            break;
        case playerSelection == computerSelection:
            playerResult = "draw";
            break;
        default:
            playerResult = "defeat";
    }

    switch (playerResult) {
        case "win":
            return `You win! ${playerSelection} beats ${computerSelection}`;
        case "defeat":
            return `You lose! ${computerSelection} beats ${playerSelection}`;
        case "draw":
            return `It's a draw!`;
        default:
            throw "The round could not be played, something went wrong";
    }
}

function game() {
    const roundNumber = 5;
    let playerWins = 0;
    let computerWins = 0;

    while (playerWins != 5 && computerWins != 5) {
        const playerSelection = prompt("Make your move by entering one of the words: Rock - Paper - Scissors");
        const computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);
        console.log(result);

        switch (true) {
            case result.includes("win"):
                playerWins++;
                break;
            case result.includes("lose"):
                computerWins++;
                break;
        }

        console.log(`Player: ${playerWins} - Computer: ${computerWins}`);
    }
    
    switch (true) {
        case (playerWins > computerWins):
            return "Player wins the game!";
        case (computerWins > playerWins):
            return "Computer wins the game!";
        
    }
}
