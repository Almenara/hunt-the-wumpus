export class cell{
    id      : number;
    shown   : boolean;
    content : null | string[];
    hero    : boolean;


    constructor(data: any){
        this.id         = data.id;
        this.shown      = false;
        this.content    = null;
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

}