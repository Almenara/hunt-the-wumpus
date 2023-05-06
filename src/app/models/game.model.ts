import { directions } from "./enums/directions.enum";
import { types } from "./enums/types.enum";

import { cell } from "./cell.model";

export class game{
    cells           : number;
    holes           : number;
    arrows          : number;
    totalMoves      : number = 0;
    score           : number = 0;
    heroPosition    : {row : number , col : number} = {row : 0, col : 0};
    heroDirection   : directions = directions.UP;

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
        this.addGoldToBoard();
        this.addMonsterToBoard();
    }
    
    addGoldToBoard(){
        let row = this.getRandomCell();
        let col = this.getRandomCell();
        if(!this.isCellOccupied(row, col))
            this.board[row][col].addObject({
                type: types.OBJECT,
                kill: false, 
                takeable: true, 
                name: 'gold', 
                alife: false, 
                icon: '💰'
            });
        else this.addGoldToBoard();
    }

    addMonsterToBoard(){
        let row = this.getRandomCell();
        let col = this.getRandomCell();
        if(!this.isCellOccupied(row, col))
            this.board[row][col].addObject({
                type: types.OBJECT,
                kill: true, 
                takeable: false, 
                name: 'monster', 
                alife: true, 
                icon: '🧌'
            });
        else this.addGoldToBoard();
    }

    addHeroOnStartCell(){
        this.heroPosition.row = this.board.length - 1;
        this.heroPosition.col = 0;
        this.board[this.heroPosition.row][this.heroPosition.col].addHero();
    }

    turnLeftHero(){
        this.addMove()
        this.heroDirection = this.heroDirection == 0 ? 3 : this.heroDirection - 1
    }

    turnRightHero(){
        this.addMove()
        this.heroDirection = this.heroDirection == 3 ? 0 : this.heroDirection + 1
    }

    moveHero(){
        this.addMove()
        switch (this.heroDirection) {
            case directions.UP:
                this.moveHeroUp();
                break;
            case directions.DOWN:
                this.moveHeroDown();
                break;
            case directions.LEFT:
                this.moveHeroLeft();
                break;
            case directions.RIGHT:
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

    shot(){
        this.addMove()
        if(this.arrows != 0) this.arrows--;
    }
    getGold(){
        let cell = this.board[this.heroPosition.row][this.heroPosition.col];
        this.addMove()
        cell.content?.forEach( item => { if(item.takeable) this.score += 1000 })
        cell.content = cell.content?.filter(item => !item.takeable);
    }

    getRandomCell():number{
        return Math.floor(Math.random() * this.cells)
    }

    isCellOccupied(row : number, col : number):boolean{
        if(row == this.cells - 1 && col == 0) return true;
        if( this.board[row][col].content?.filter(element => element.type != 0 )) return true
        return false;
    }

    addMove(){
        this.totalMoves++;
        console.log('total moves:',this.totalMoves)
    }

}