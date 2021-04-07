import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersComponent } from './farmers.component';
import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersService } from 'src/app/services/farmers.service';

@NgModule({
  declarations: [
    FarmersComponent,
  ],
  imports: [
    CommonModule,
    FarmersRoutingModule,
    // NgxMaskModule.forRoot(),
  ],
  providers: [
    FarmersService,
  ]
})
export class FarmersModule { }
