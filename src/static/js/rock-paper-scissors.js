function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return "Quartz";
        case 1:
            return "Parchment";
        case 2:
            return "Shears";
        default:
            throw "Value does not represent a valid play";
    }
}

function getPlayerResult(playerSelection, computerSelection) {
    switch (true) {
        case !(["Quartz", "Parchment", "Shears"].includes(playerSelection)):
            throw "Player move is not valid";
        case playerSelection == "Quartz" && computerSelection == "Shears":
        case playerSelection == "Shears" && computerSelection == "Parchment":
        case playerSelection == "Parchment" && computerSelection == "Quartz":
            return "win";
        case playerSelection == computerSelection:
            return "draw";
        default:
            return "defeat";
    }
}

function showRoundInfo(playerResult, playerSelection, computerSelection) {
    const playedMoves = document.createElement("div");
    playedMoves.id = "played-moves";

    const playerParagraph = document.createElement("p");
    playerParagraph.textContent = `Player chooses ${playerSelection}!`;

    const computerParagraph = document.createElement("p");
    computerParagraph.textContent = `Computer chooses ${computerSelection}!`;

    playedMoves.appendChild(playerParagraph);
    playedMoves.appendChild(computerParagraph);
    
    const roundResult = document.createElement("p");
    roundResult.id = "round-result";
    switch (true) {
        case (playerResult === "win"):
            roundResult.textContent = "Player wins this round";
            break;
        case (playerResult === "defeat"):
            roundResult.textContent = "Computer wins this round";
            break;
        default:
            roundResult.textContent = "It is a tie";
    }

    const main = document.querySelector("main");
    const previousPlayedMoves = document.querySelector("#played-moves");
    const previousRoundResult = document.querySelector("#round-result");
    if (previousPlayedMoves) {
        main.replaceChild(playedMoves, previousPlayedMoves);
        main.replaceChild(roundResult, previousRoundResult);
    }
    else {
        main.appendChild(playedMoves);
        main.appendChild(roundResult);
    }

}

function updateScoreboard(playerResult) {
    switch (playerResult) {
        case "win":
            const playerScore = document.querySelector("#player-score");
            playerScore.textContent = Number(playerScore.textContent) + 1;
            break;
        case "defeat":
            const computerScore = document.querySelector("#computer-score");
            computerScore.textContent = Number(computerScore.textContent) + 1;
            break;
    }
}

function getScoreboardState() {
    const playerScore = Number(document.querySelector("#player-score").textContent);
    const computerScore = Number(document.querySelector("#computer-score").textContent);
    const scoreboardState = {
        playerScore: playerScore,
        computerScore: computerScore
    };

    return scoreboardState;
}

function declareWinner(scoreboardState) {
    let winner;
    switch (true) {
        case scoreboardState.playerScore == 5:
            winner = "Player";
            break;
        case scoreboardState.computerScore == 5:
            winner = "Computer";
            break;
        default:
            return;
    }

    const winnerDeclaration = document.createElement("p");
    winnerDeclaration.textContent = `${winner} wins the game! Press F5 to play again`
    const main = document.querySelector("main");
    main.appendChild(winnerDeclaration);
}

function disableMoveButtons() {
    const moveButtons = document.querySelectorAll(".move-option");
    moveButtons.forEach(move => {
        move.disabled = true;
    });
}

function playRound() {
    const playerSelection = this.value;
    const computerSelection = computerPlay();
    const playerResult = getPlayerResult(playerSelection, computerSelection);

    showRoundInfo(playerResult, playerSelection, computerSelection);
    updateScoreboard(playerResult);

    const scoreboardState = getScoreboardState();
    if (scoreboardState.playerScore == 5 || scoreboardState.computerScore == 5) {
        declareWinner(scoreboardState);
        disableMoveButtons();
    }
}

const moveButtons = document.querySelectorAll(".move-option");
moveButtons.forEach(move => {
    move.addEventListener("click", playRound);
});

/*
function game() {
    const roundNumber = 5;
    let playerWins = 0;
    let computerWins = 0;

    while (playerWins != 5 && computerWins != 5) {
        const playerSelection = prompt("Make your move by entering one of the words: Quartz - Parchment - Shears");
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
*/
