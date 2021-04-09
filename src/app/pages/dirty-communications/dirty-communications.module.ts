import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DirtyCommunicationsRoutingModule } from './dirty-communications-routing.module';
import { DirtyCommunicationsComponent } from './dirty-communications.component';
import { DirtyCommunicationsReviewComponent } from './dirty-communications-review/dirty-communications-review.component';

import { CommunicationsService } from 'src/app/services/communications.service';
import { SharedModules } from 'src/app/components/shared/shared-modules.module';
import { AsyncSelectModule } from 'src/app/components/async-select/async-select.module';

@NgModule({
  declarations: [
    DirtyCommunicationsComponent,
    DirtyCommunicationsReviewComponent,
  ],
  imports: [
    CommonModule,
    DirtyCommunicationsRoutingModule,

    SharedModules,
    AsyncSelectModule,
    MatSlideToggleModule,
  ],
  providers: [
    CommunicationsService,
  ]
})
export class DirtyCommunicationsModule { }
