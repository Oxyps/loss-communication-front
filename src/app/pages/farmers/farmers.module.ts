import { NgModule } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { FarmersComponent } from './farmers.component';
import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersFormComponent } from './farmers-form/farmers-form.component';

import { FarmersService } from 'src/app/services/farmers.service';
import { SharedModules } from 'src/app/components/shared/shared-modules.module';

const maskConfig: Partial<IConfig> = {
};

@NgModule({
  declarations: [
    FarmersComponent,
    FarmersFormComponent,
  ],
  imports: [
    FarmersRoutingModule,
    NgxMaskModule.forRoot(maskConfig),

    SharedModules,
  ],
  providers: [
    FarmersService,
  ]
})
export class FarmersModule { }
