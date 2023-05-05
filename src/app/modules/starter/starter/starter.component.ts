import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent {
  public gameStarted : boolean = false;
  
  public gameOptionsForm: FormGroup = this.fb.group({
    cells:          [4, [Validators.required, Validators.min(4)]],
    holes:          [2, [Validators.required, Validators.min(2)]],
    arrows:         [1, [Validators.required, Validators.min(1)]],
  })
  
  constructor(
    private fb: FormBuilder
  ){}
  
  startGame() {
    this.gameStarted = true;
  }
}
