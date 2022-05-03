class TicTacToe{
    constructor(){
        this.board = new Array(9);
        this.lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        this.moves = 0;
        this.finished = false;
    }
    play(position){
        if(this.finished){//Game already ended, does not allow for more moves
            return "Game has already finished";
        }
        if(typeof this.board[position]  !== "undefined"){//It is not a legal move
            return "There is a piece already there";
        }
        this.board[position] = displayHTML.dataset.player;
        this.moves += 1;
        //Check if game is over
        let gameEnd = this.lines.some(line =>{//Checks, for each line, of the elements are all the same
            if(typeof this.board[line[0]]  === "undefined") return false;
            if(typeof this.board[line[1]]  === "undefined") return false;
            if(typeof this.board[line[2]]  === "undefined") return false;
            return this.board[line[0]] === this.board[line[1]] && this.board[line[0]] === this.board[line[2]];
        });
        if(gameEnd){
            this.finished = true;
            return "game has ended with a victor";
        }
        if(this.moves == 9){
            gameEnd = true;
            return "It's a draw";
        }
        return "game continues";
    }
    clear(){
        this.board = new Array(9);
        this.moves = 0;
        //clear all crosses and circles from the background
        buttonsHTML.forEach(ele => ele.classList.remove("cross"));
        buttonsHTML.forEach(ele => ele.classList.remove("circle"));
        this.finished = false;
        displayHTML.dataset.player = "Player 1";
        displayHTML.innerHTML = "Player 1 plays";
    }
}



let game = new TicTacToe();
const buttonsHTML = document.querySelectorAll(".button");
const displayHTML = document.querySelector("#display");
const restartHTML = document.querySelector("#restart");

restartHTML.addEventListener('click', () =>{
    game.clear()
})

buttonsHTML.forEach((buttonHTML, item) => {
    buttonHTML.addEventListener('click', ()=>{
        switch ( game.play(item)){
            case "game has ended with a victor":
                console.log("someone won");
                displayHTML.innerHTML = displayHTML.dataset.player+ " wins";
                if(displayHTML.dataset.player === "Player 1"){
                    buttonHTML.classList.toggle("cross");
                } else {
                    buttonHTML.classList.toggle("circle");
                }
                displayHTML.dataset.player = "End Game";
                break;
            case "game continues":
                console.log("game continues");
                if(displayHTML.dataset.player === "Player 1"){
                    buttonHTML.classList.toggle("cross");
                    displayHTML.dataset.player = "Player 2";
                    displayHTML.innerHTML = "Player 2 plays";
                } else {
                    buttonHTML.classList.toggle("circle");
                    displayHTML.dataset.player = "Player 1";
                    displayHTML.innerHTML = "Player 1 plays";
                }
                break;
            case "It's a draw":
                console.log("its a draw");
                if(displayHTML.dataset.player === "Player 1"){
                    buttonHTML.classList.toggle("circle");
                } else {
                    buttonHTML.classList.toggle("cross");
                }
                displayHTML.dataset.player = "Draw";
                displayHTML.innerHTML = "Draw";
                break;
            case "There is a piece already there":
                console.log("there is a piece already there");
                
                break;
            case "Game has already finished":
                console.log("game has finished, stop clicking");
                
                break;
        }
    })
});