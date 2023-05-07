import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game!:game;
  @Output() gameOver = new EventEmitter<boolean>();

  constructor(){
  }
  closeGame(){
    this.gameOver.emit(true);
  }

  ngOnInit() {
   // console.log(this.game);
  }
}

