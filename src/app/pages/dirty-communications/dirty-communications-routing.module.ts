import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirtyCommunicationsComponent } from './dirty-communications.component';
import { DirtyCommunicationsReviewComponent } from './dirty-communications-review/dirty-communications-review.component';

const routes: Routes = [
  { path: '', component: DirtyCommunicationsComponent },
  { path: ':id', component: DirtyCommunicationsReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirtyCommunicationsRoutingModule { }
