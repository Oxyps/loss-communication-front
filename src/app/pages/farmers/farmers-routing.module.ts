import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmersComponent } from './farmers.component';
import { FarmersFormComponent } from './farmers-form/farmers-form.component';

const routes: Routes = [
  { path: '', component: FarmersComponent },
  { path: 'cadastrar', component: FarmersFormComponent },
  { path: ':id', component: FarmersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmersRoutingModule { }
