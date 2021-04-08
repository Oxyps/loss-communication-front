import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationsComponent } from './communications.component';
import { CommunicationsRoutingModule } from './communications-routing.module';

import { CommunicationsService } from 'src/app/services/communications.service';
import { SharedModules } from 'src/app/components/shared/shared-modules.module';
import { AsyncSelectModule } from 'src/app/components/async-select/async-select.module';
import { CommunicationsFormComponent } from './communications-form/communications-form.component';

@NgModule({
  declarations: [
    CommunicationsComponent,
    CommunicationsFormComponent,
  ],
  imports: [
    CommonModule,
    CommunicationsRoutingModule,

    SharedModules,
    AsyncSelectModule,
  ],
  providers: [
    CommunicationsService,
  ]
})
export class CommunicationsModule { }
