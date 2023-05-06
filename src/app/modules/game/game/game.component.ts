import { Component, Input, OnInit } from '@angular/core';

import { game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game!:game

  constructor(){
  }
  
  ngOnInit() {
   // console.log(this.game);
  }
}

