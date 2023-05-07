import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './layout/main/main.component';
import { GameComponent } from '../modules/game/game.component';
import { StarterComponent } from '../modules/starter/starter.component';


@NgModule({
  declarations: [
    MainComponent,
    GameComponent,
    StarterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
