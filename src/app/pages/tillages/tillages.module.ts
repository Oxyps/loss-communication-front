import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TillagesComponent } from './tillages.component';
import { TillagesFormComponent } from './tillages-form/tillages-form.component';

import { TillagesRoutingModule } from './tillages-routing.module';

import { TillagesService } from 'src/app/services/tillages.service';
import { LocationService } from 'src/app/services/location.service';
import { SharedModules } from 'src/app/components/shared/shared-modules.module';

const maskConfig: Partial<IConfig> = {
};

@NgModule({
  declarations: [
    TillagesComponent,
    TillagesFormComponent,
  ],
  imports: [
    TillagesRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(maskConfig),
    MatButtonToggleModule,

    SharedModules,
  ],
  providers: [
    TillagesService,
    LocationService,
  ]
})
export class TillagesModule { }
