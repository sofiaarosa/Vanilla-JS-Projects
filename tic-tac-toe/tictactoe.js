ticTacToe = {
    player1: true,
    player2: false,
    winner: '',

    clearGrid() {
        const cels = document.querySelectorAll(".cel");
        cels.forEach(cel => {
            cel.innerHTML = '';
        });
    },

    showStatus(flag) {
        let turnHTML = document.getElementById("turn");
        let resultHTML = document.getElementById("result");
        let btn = document.getElementById("restart");

        btn.style.display = "none";
        turnHTML.innerHTML = "";
        resultHTML.innerHTML = "";

        if (!flag) {
            if (ticTacToe.player1) {
                turnHTML.innerHTML = "<span class='playing'>Turn Of</span> Player 1 (X)";
            } else {
                turnHTML.innerHTML = "<span class='playing'>Turn Of</span> Player 2 (O)";
            }
        }
        else {
            const turn = document.querySelectorAll(".playing");
            turn.forEach(item=>{
                item.innerHTML = '';
            })
            if(ticTacToe.winner != "Tie" )resultHTML.innerHTML = ticTacToe.winner + " wins";
            else resultHTML.innerHTML = ticTacToe.winner;
            btn.style.display = "block";
        }
    },

    showPoints(){
        let player1ptHTML = document.getElementById("player1-pts");
        let player2ptHTML = document.getElementById("player2-pts");
        player1ptHTML.innerHTML = sessionStorage.getItem("X");
        player2ptHTML.innerHTML = sessionStorage.getItem("O");
    },

    startGame() {

        ticTacToe.clearGrid();

        let previousWinner = ticTacToe.winner;
        ticTacToe.winner = '';

        if (previousWinner == 'X') {
            ticTacToe.player1 = false;
            ticTacToe.player2 = true;
        } else if (previousWinner == 'O') {
            ticTacToe.player2 = false;
            ticTacToe.player1 = true;
        } else {
            let randomPlayer = Math.random();
            if (Math.floor(randomPlayer) == 0) {
                ticTacToe.player1 = true;
                ticTacToe.player2 = false;
            } else {
                ticTacToe.player1 = false;
                ticTacToe.player2 = true;
            }
        }

        ticTacToe.showStatus(false);
        ticTacToe.showPoints();
    },

    changeTurn() {
        if (ticTacToe.player1) {
            ticTacToe.player1 = false;
            ticTacToe.player2 = true;
        } else {
            ticTacToe.player2 = false;
            ticTacToe.player1 = true;
        }
    },

    verifyCel(index) {
        if(ticTacToe.winner!="") return false;
        const cels = document.querySelectorAll(".cel");
        if (cels[index].innerHTML != "") return false;
        else return true;
    },

    setPoints(winner){
        
        let winnerpt = sessionStorage.getItem(winner);
        if(winnerpt == "0") winnerpt=0;
        winnerpt = Number.parseInt(winnerpt);
        console.log(winnerpt)
        winnerpt ++;
        sessionStorage.setItem(winner,winnerpt.toString());

        ticTacToe.showPoints();
    },

    setWinner(winner) {
        ticTacToe.winner = winner; //temporary
        if(winner!="Tie")ticTacToe.setPoints(winner);
    },

    verifyWinner() {
        // console.log("function verifywinner")
        const cels = document.querySelectorAll(".cel");
        let line = [];

        //check horizontal
        for (let i = 0; i < cels.length; i++) {
            const cel = cels[i];
            line.push(cel.innerHTML);
            // console.log(line);

            if (line.length == 3) {
                if (line[0] == line[1] && line[0] == line[2] && line[0] != "") {
                    ticTacToe.setWinner(line[0]);
                    return true;
                }
                else {
                    line = [];
                }
            }
        }

        line = [];

        //check vertical
        for (let j = 0; j < 3; j++) {
            for (let i = j; i <= j + 6; i += 3) {
                const cel = cels[i];
                line.push(cel.innerHTML);
                // console.log(line);

                if (line.length == 3) {
                    if (line[0] == line[1] && line[0] == line[2] && line[0] != "") {
                        ticTacToe.setWinner(line[0]);
                        return true;
                    }
                    else {
                        line = [];
                    }
                }
            }
        }

        line = [];

        //check diagonal
        line.push(cels[0].innerHTML);line.push(cels[4].innerHTML);line.push(cels[8].innerHTML);
        if (line[0] == line[1] && line[0] == line[2] && line[0] != "") {
            ticTacToe.setWinner(line[0]);
            return true;
        } else line=[];

        line.push(cels[2].innerHTML);line.push(cels[4].innerHTML);line.push(cels[6].innerHTML);
        if (line[0] == line[1] && line[0] == line[2] && line[0] != "") {
            ticTacToe.setWinner(line[0]);
            return true;
        } else line=[];

        //check tie
        let flag = false;
        cels.forEach(cel=>{
            if(cel.innerHTML=="") flag=true;
        });
        
        if(!flag){
            ticTacToe.setWinner("Tie");
            return true;
        }

        return false;
    },

    gameFinished() {
        let flag = true; let i = 0;

        if (ticTacToe.verifyWinner() == true) return flag;

        const cels = document.querySelectorAll(".cel");

        do {
            if (cels[i].innerHTML == "") {
                flag = false;
                break;
            }
            i++;
        } while (i < cels.length);

        if (flag == true) ticTacToe.setWinner();

        return flag;
    },

    celClick(index) {
        const cels = document.querySelectorAll(".cel");
        let content = '';
        if (ticTacToe.player1) content = 'X';
        else content = 'O';

        if (ticTacToe.verifyCel(index)) {
            cels.item(index).innerHTML = content;

            let finished = ticTacToe.gameFinished();
            console.log(finished, ticTacToe.winner);
            if (!finished) ticTacToe.changeTurn();
            ticTacToe.showStatus(finished);
        }
    }
}

//main - on page load

let btn = document.getElementById("restart");
btn.addEventListener("click", ticTacToe.startGame);

const cels = document.querySelectorAll(".cel");
for (let i = 0; i < cels.length; i++) {
    cels[i].addEventListener("click", function () {
        ticTacToe.celClick(i)
    });
}

ticTacToe.startGame();