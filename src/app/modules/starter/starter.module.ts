import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter/starter.component';


@NgModule({
  declarations: [
   // StarterComponent
  ],
  imports: [
    CommonModule,
    StarterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StarterModule { }
