import { types } from "./enums/types.enum";

export class content{

    type     : types;
    kill     : boolean;
    takeable : boolean;
    name     : string;
    icon     : string;   
    alife    : boolean;

    constructor(data: any){
        this.type       = data.type;
        this.kill       = data.kill;
        this.takeable   = data.takeable;
        this.name       = data.name;
        this.icon       = data.icon
        this.alife      = data.alife
    }

    destroy(){

    }

}