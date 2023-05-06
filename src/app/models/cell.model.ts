import { content } from "./content.model";

export class cell{
    id      : number;
    shown   : boolean;
    content : undefined | content[];
    hero    : boolean;


    constructor(data: any){
        this.id         = data.id;
        this.shown      = false;
        this.content    = undefined;
        this.hero       = false;
    }

    show(){
        this.shown = true;
    }

    addHero(){
        this.hero   = true;
        this.shown  = true;
    }
    removeHero(){
        this.hero = false;
    }

    addObject( boardElement: {} ){
        if(this.content == null) this.content = [];
        this.content.push(new content(boardElement));
    }

}