import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationsComponent } from './communications.component';
import { CommunicationsRoutingModule } from './communications-routing.module';
import { CommunicationsService } from 'src/app/services/communications.service';

@NgModule({
  declarations: [
    CommunicationsComponent,
  ],
  imports: [
    CommonModule,
    CommunicationsRoutingModule,
  ],
  providers: [
    CommunicationsService,
  ]
})
export class CommunicationsModule { }
