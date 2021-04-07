import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationsComponent } from './communications.component';

const routes: Routes = [
  { path: '', component: CommunicationsComponent },
  // { path: 'cadastrar', component: CommunicationsFormComponent },
  // { path: ':id', component: CommunicationsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule { }
