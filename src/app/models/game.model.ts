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
    heroDeath       : boolean = false;
    monsterDeath    : boolean = false;
    monsterPosition : {row : number , col : number} = {row : 0, col : 0};
    hasGold         : boolean = false;
    playerWin       : boolean = false;
    gameMessage     : string = "";  

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
        this.addHoleToBoard();
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
                icon: '💰'
            });
        else this.addGoldToBoard();
    }

    addMonsterToBoard(){
        let row = this.getRandomCell();
        let col = this.getRandomCell();
        if(!this.isCellOccupied(row, col)){
            this.board[row][col].addObject({
                type: types.OBJECT,
                kill: true, 
                takeable: false, 
                name: 'monster', 
                icon: '👹'
            });
            this.monsterPosition = {row,col};
            this.addMonsterTracks(row,col);
        }
        else this.addMonsterToBoard();
    }

    addMonsterTracks(row: number, col: number){
        if(row > 0){
            this.board[row - 1][col].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'monsterTrack', 
                icon: '💩'
            });
        }
        if(row < this.cells - 1){
            this.board[row + 1][col].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'monsterTrack', 
                icon: '💩'
            });
        }
        if(col > 0){
            this.board[row][col - 1].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'monsterTrack', 
                icon: '💩'
            });
        }
        if(col < this.cells - 1){
            this.board[row][col + 1].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'monsterTrack', 
                icon: '💩'
            });
        }
    }
    addHoleToBoard(){
        for(let i = 0; i < this.holes; i ++){
            let row = this.getRandomCell();
            let col = this.getRandomCell();
            if(!this.isCellOccupied(row, col)){
                this.board[row][col].addObject({
                    type: types.OBJECT,
                    kill: true, 
                    takeable: false, 
                    name: 'hole', 
                    icon: '🕳️'
                });
                this.addHoleTracks(row, col)
            }
            else i--;    
        }

    }

    addHoleTracks(row: number, col: number){
        if(row > 0 && !this.isCellOccupiedByHoleTrack(row - 1, col)){
            this.board[row - 1][col].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'holeTruck', 
                icon: '💨'
            });
        }
        if(row < this.cells - 1 && !this.isCellOccupiedByHoleTrack(row + 1, col)){
            this.board[row + 1][col].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'holeTruck', 
                icon: '💨'
            });
        }
        if(col > 0 && !this.isCellOccupiedByHoleTrack(row, col - 1)){
            this.board[row][col - 1].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'holeTruck', 
                icon: '💨'
            });
        }
        if(col < this.cells - 1 && !this.isCellOccupiedByHoleTrack(row, col + 1)){
            this.board[row][col + 1].addObject({
                type: types.TRACK,
                kill: false, 
                takeable: false, 
                name: 'holeTruck', 
                icon: '💨'
            });
        }
    }

    isCellOccupied(row : number, col : number):boolean{
        return (row == this.cells - 1 && col == 0) || this.board[row][col].content?.filter( element => element.type == types.OBJECT) ? true : false;
    }

    isCellOccupiedByHoleTrack(row: number, col: number):boolean{
        //TODO Indicar la clase de pista de otra manera que no sea un string
        return this.board[row][col].content?.filter( element => element.name == "holeTruck").length ? true : false
    }

    addHeroOnStartCell(){
        this.heroPosition.row = this.board.length - 1;
        this.heroPosition.col = 0;
        this.board[this.heroPosition.row][this.heroPosition.col].addHero();
    }

    turnLeftHero(){
        this.gameMessage = "";
        if(!this.heroDeath && !this.playerWin){
            this.addMove();
            this.heroDirection = this.heroDirection == 0 ? 3 : this.heroDirection - 1;
        }
    }

    turnRightHero(){
        this.gameMessage = "";
        if(!this.heroDeath && !this.playerWin){
            this.addMove();
            this.heroDirection = this.heroDirection == 3 ? 0 : this.heroDirection + 1;
        }
    }

    moveHero(){
        this.gameMessage = "";
        if(!this.heroDeath && !this.playerWin){
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
    }

    moveHeroUp(){
        if(this.heroPosition.row > 0){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.row--;
            this.isCellOccupiedByKiller(this.heroPosition.row,this.heroPosition.col) ? this.gameOver(this.heroPosition.row,this.heroPosition.col) : this.board[this.heroPosition.row][this.heroPosition.col].addHero();  
        }
        else this.gameMessage = "Against the wall";
    }

    moveHeroDown(){
        if(this.heroPosition.row < this.board.length - 1){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.row++;
            this.isCellOccupiedByKiller(this.heroPosition.row,this.heroPosition.col) ? this.gameOver(this.heroPosition.row,this.heroPosition.col) : this.board[this.heroPosition.row][this.heroPosition.col].addHero();  
        }
        else this.gameMessage = "Against the wall";
    }

    moveHeroLeft(){
        if(this.heroPosition.col > 0){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.col--;
            this.isCellOccupiedByKiller(this.heroPosition.row,this.heroPosition.col) ? this.gameOver(this.heroPosition.row,this.heroPosition.col) : this.board[this.heroPosition.row][this.heroPosition.col].addHero();  
        }
        else this.gameMessage = "Against the wall";
    }

    moveHeroRight(){
        if(this.heroPosition.col < this.board[0].length - 1){
            this.board[this.heroPosition.row][this.heroPosition.col].removeHero();
            this.heroPosition.col++;
            this.isCellOccupiedByKiller(this.heroPosition.row,this.heroPosition.col) ? this.gameOver(this.heroPosition.row,this.heroPosition.col) : this.board[this.heroPosition.row][this.heroPosition.col].addHero();  
        }
        else this.gameMessage = "Against the wall";
    }

    isCellOccupiedByKiller(row: number, col: number):boolean{
        return this.board[row][col].content?.filter( element => element.kill).length ? true : false
    }

    shot(){
        this.gameMessage = "";
        
        if(!this.heroDeath && !this.playerWin){
            this.addMove()
            if(this.arrows != 0 && !this.heroDeath){
                this.arrows--;
                switch (this.heroDirection) {
                    case directions.UP:
                        if(this.heroPosition.col == this.monsterPosition.col && this.heroPosition.row > this.monsterPosition.row) this.monsterKilled();
                        break;
                    case directions.DOWN:
                        if(this.heroPosition.col == this.monsterPosition.col && this.heroPosition.row < this.monsterPosition.row) this.monsterKilled();
                        break;
                    case directions.LEFT:
                        if(this.heroPosition.col > this.monsterPosition.col && this.heroPosition.row == this.monsterPosition.row) this.monsterKilled();
                        break;
                    case directions.RIGHT:
                        if(this.heroPosition.col < this.monsterPosition.col && this.heroPosition.row == this.monsterPosition.row) this.monsterKilled();
                        break;
                }
                if(!this.monsterDeath){
                    this.gameMessage = "Fail!"
                }
            }
        }
    }

    monsterKilled(){
        this.monsterDeath = true;
        let row: number = this.monsterPosition.row;
        let col: number = this.monsterPosition.col;

        this.board[row][col].content = this.board[row][col].content?.filter(content => content.type != types.OBJECT);
        //TODO buscar otra manera de eliminar las pistas del monstruo que nos sea mediante un string
        if(row > 0){
            this.board[row - 1][col].content = this.board[row - 1][col].content?.filter(content => content.name != "monsterTrack" );
        }
        if(row < this.cells - 1){
            this.board[row + 1][col].content = this.board[row + 1][col].content?.filter(content => content.name != "monsterTrack" );
        }
        if(col > 0){
            this.board[row][col - 1].content = this.board[row][col - 1].content?.filter(content => content.name != "monsterTrack" );
        }
        if(col < this.cells - 1){
            this.board[row][col + 1].content = this.board[row][col + 1].content?.filter(content => content.name != "monsterTrack" );
        }
        
        this.gameMessage = "You killed the Wumpus!"
    }

    getGold(){
        this.gameMessage = ""
        let cell = this.board[this.heroPosition.row][this.heroPosition.col];
        this.addMove()
        cell.content?.forEach( item => { 
            if(item.takeable){
                this.score += 1000;
                this.hasGold = true;
                this.gameMessage = "You got the gold!"
            } 
        })
        cell.content = cell.content?.filter(item => !item.takeable);
    }

    getRandomCell():number{
        return Math.floor(Math.random() * this.cells)
    }

    addMove(){
        this.totalMoves++;
    }

    heroIsAtExit(){
        return this.heroPosition.row == this.cells - 1 && this.heroPosition.col == 0;
    }

    gameOver(row:number, col:number){
        this.heroDeath = true;
        this.board[this.heroPosition.row][this.heroPosition.col].shown=true
        this.gameMessage = "You died!"
    }

    exit(){
        if(!this.heroDeath && !this.playerWin){
            if(this.hasGold && this.heroIsAtExit()){
                this.playerWin = true;
                this.gameMessage = "YOU WIN!"
            }
            else if(!this.hasGold && this.heroIsAtExit()){
                this.gameMessage = "Get the gold to get out";
            }
            else if(!this.heroIsAtExit()){
                this.gameMessage = "Go to door";
            }
        }
    }

}