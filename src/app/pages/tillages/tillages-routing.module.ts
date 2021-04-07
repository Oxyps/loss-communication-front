import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TillagesComponent } from './tillages.component';
import { TillagesFormComponent } from './tillages-form/tillages-form.component';

const routes: Routes = [
  { path: '', component: TillagesComponent },
  { path: 'cadastrar', component: TillagesFormComponent },
  { path: ':id', component: TillagesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TillagesRoutingModule { }
