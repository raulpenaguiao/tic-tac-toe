class TicTacToe{
    constructor(){
        this.board = new Array(9);
        this.lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
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
        //Check if game is over
        let gameEnd = this.lines.some(line =>{//Checks, for each line, of the elements are all the same
            if(typeof this.board[line[0]]  === "undefined") return false;
            if(typeof this.board[line[1]]  === "undefined") return false;
            if(typeof this.board[line[2]]  === "undefined") return false;
            return this.board[line[0]] === this.board[line[1]] && this.board[line[0]] === this.board[line[2]];
        });
        //Add symbol to corresponding square in DOM
        if(displayHTML.dataset.player === "Player 1"){
            buttonsHTML[position].classList.toggle("cross");
            displayHTML.dataset.player = "Player 2";
            displayHTML.innerHTML = "Player 2 plays";
        } else{
            buttonsHTML[position].classList.toggle("circle");
            displayHTML.dataset.player = "Player 1";
            displayHTML.innerHTML = "Player 1 plays";
        }
        if(gameEnd){
            this.finished = true;
            displayHTML.innerHTML = displayHTML.dataset.player+ " wins";
            displayHTML.dataset.player = "End Game";
            return "game has ended";
        }
        return "game continues";
    }
    clear(){
        this.board = new Array(9);
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
        game.play(item);
    })
});