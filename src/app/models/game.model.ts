export class game{
    cells   : number;
    holes   : number;
    arrows  : number;

    board  : number[][] = [];   

    constructor(data: any){
        this.cells  = data.cells;
        this.holes  = data.holes;
        this.arrows = data.arrows;
        this.createBoard()
    }

    createBoard(){
        for(let i = 0; i < this.cells; i++){

            let row: number[] = new Array;

            for(let e:number = 1; e < this.cells +1 ; e++){
                row.push(e+(i * this.cells));
            }

            this.board.push(row);
            
        }
        this.addGameElementsToBoard();
        //console.log(this.board)
    }

    addGameElementsToBoard(){

    }
}