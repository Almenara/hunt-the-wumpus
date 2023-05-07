import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { game } from 'src/app/models/game.model';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent {
  public gameStarted : boolean = false;
  public game! :       game | undefined;
  public maxHoles :    number = 2;

  public gameOptionsForm: FormGroup = this.fb.group({
    cells:  [4, [Validators.required, Validators.min(4), Validators.max(9)]],
    holes:  [2, [Validators.required, Validators.min(0), Validators.max(this.maxHoles)]],
    arrows: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
  })
  
  constructor(
    private fb: FormBuilder
  ){}
  
  cellsChanges(){
    this.maxHoles = Math.round((this.gameOptionsForm.value.cells / 2) - 1) < 2 ? 2 : Math.round((this.gameOptionsForm.value.cells / 2) - 1);
    this.gameOptionsForm.controls['holes'].setValidators([Validators.required, Validators.min(0), Validators.max(this.maxHoles)]);
  }

  startGame() {
    this.game = new game(this.gameOptionsForm.value);
    this.gameStarted = true;
  }

  gameOver(over: boolean){
      this.game = undefined;
      this.gameStarted = false;
  }

}
