import { cell } from "./cell.model";

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

export class game{
    cells           : number;
    holes           : number;
    arrows          : number;
    heroPosition    : {row : number , col : number} = {row : 0, col : 0};
    heroDirection   : Direction = Direction.UP;

    board   : cell[][] = [];   

    constructor(data: any){
        this.cells  = data.cells;
        this.holes  = data.holes;
        this.arrows = data.arrows;
        this.createBoard()
    }

    createBoard(){
        for(let i = 0; i < this.cells; i++){

            let row: cell[] = new Array;

            for(let e:number = 1; e < this.cells + 1 ; e++){
            
                row.push(new cell({
                   id       : e+(i * this.cells)
                }));
            }

            this.board.push(row);
            
        }
        this.addHeroOnStartCell();
        this.addGameElementsToBoard();
        //console.log(this.board)
    }

    addGameElementsToBoard(){

    }
    
    addHeroOnStartCell(){
        console.log(this.heroPosition)
        this.heroPosition.row = this.board.length - 1;
        this.heroPosition.col = 0;
        this.board[this.heroPosition.row][this.heroPosition.col].addHero();
    }

    turnLeftHero(){
        this.heroDirection = this.heroDirection == 0 ? 3 : this.heroDirection - 1
    }

    turnRightHero(){
        this.heroDirection = this.heroDirection == 3 ? 0 : this.heroDirection + 1
    }

    moveHero(){
        switch (this.heroDirection) {
            case Direction.UP:
                this.moveHeroUp();
                break;
            case Direction.DOWN:
                this.moveHeroDown();
                break;
            case Direction.LEFT:
                this.moveHeroLeft();
                break;
            case Direction.RIGHT:
                this.moveHeroRight();
                break;
         }
    }

    moveHeroUp(){
        if(this.heroPosition.row > 0){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.row--;
            this.board[this.heroPosition.row][this.heroPosition.col].addHero();
        }
    }
    moveHeroDown(){
        if(this.heroPosition.row < this.board.length - 1){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.row++;
            this.board[this.heroPosition.row][this.heroPosition.col].addHero();
        }
    }
    moveHeroLeft(){
        if(this.heroPosition.col > 0){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.col--;
            this.board[this.heroPosition.row][this.heroPosition.col].addHero();
        }
    }
    moveHeroRight(){
        if(this.heroPosition.col < this.board[0].length - 1){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.col++;
            this.board[this.heroPosition.row][this.heroPosition.col].addHero();
        }
    }
}