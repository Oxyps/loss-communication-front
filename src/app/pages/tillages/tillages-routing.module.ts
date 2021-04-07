import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TillagesComponent } from './tillages.component';
import { TillageFormComponent } from './tillage-form/tillage-form.component';

const routes: Routes = [
  { path: '', component: TillagesComponent },
  { path: 'cadastrar', component: TillageFormComponent },
  { path: ':id', component: TillageFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TillagesRoutingModule { }
