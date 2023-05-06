import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [ 
  {
    path: 'starter',
    pathMatch: 'full',
    component: MainComponent
  },
  {
    path: 'game',
    pathMatch: 'full',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
